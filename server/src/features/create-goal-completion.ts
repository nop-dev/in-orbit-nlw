import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { db } from "../db";
import { completedGoals, goals } from "../db/schema";
import { and, lte, gte, count, eq, sql } from "drizzle-orm";

// Extensão para calcular a semana do ano
dayjs.extend(weekOfYear);

interface CreateGoalCompletionRequest {
  goalId: string;
}

export async function createGoalCompletion({
  goalId,
}: CreateGoalCompletionRequest) {
  // Definindo o primeiro e o último dia da semana
  const firstDayOfWeek = dayjs().startOf('week').toDate();
  const lastDayOfWeek = dayjs().endOf('week').toDate();

  // Subconsulta para contar as metas completadas durante a semana
  const completedGoalsCount = db.$with('completed_goals_count').as(
    db
      .select({
        goalId: completedGoals.goalId,
        completedCount: count(completedGoals.id).as('completedCount'),
      })
      .from(completedGoals)
      .where(
        and(
          gte(completedGoals.createdAt, firstDayOfWeek),
          lte(completedGoals.createdAt, lastDayOfWeek),
          eq(completedGoals.goalId, goalId)
        )
      )
      .groupBy(completedGoals.goalId)
  );

  // Consulta principal para obter a frequência desejada e o número de metas completadas
  const result = await db
    .with(completedGoalsCount)
    .select({
      desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
      completedCount: sql`
        COALESCE(${completedGoalsCount.completedCount}, 0)
      `.mapWith(Number),
    })
    .from(goals)
    .leftJoin(completedGoalsCount, eq(completedGoalsCount.goalId, goals.id))
    .where(eq(goals.id, goalId))
    .limit(1);

  const { completedCount, desiredWeeklyFrequency } = result[0];

  // Verifica se a meta já foi completada o número máximo de vezes
  if (completedCount >= desiredWeeklyFrequency) {
    throw new Error('Meta já completada o máximo de vezes...');
  }

  // Inserção de uma nova meta completada
  const insertResult = await db
    .insert(completedGoals)
    .values({ goalId })
    .returning();

  const goalCompleted = insertResult[0];

  return { goalCompleted };
}