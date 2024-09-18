import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { db } from "../db";
import { completedGoals, goals } from "../db/schema";
import { and, lte, gte, count, eq, sql } from "drizzle-orm";

dayjs.extend(weekOfYear);

export async function getWeekPendingGoals() {
	const firstDayOfWeek = dayjs().startOf("week").toDate();
	const lastDayOfWeek = dayjs().endOf("week").toDate();

	console.log(new Date().toString());

	// Subconsulta para pegar as metas criadas até o final da semana
	const goalsCreatedUpToWeek = db.$with("goals_created_up_to_week").as(
		db
			.select({
				id: goals.id,
				title: goals.title,
				desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
				createdAt: goals.createdAt,
			})
			.from(goals)
			.where(lte(goals.createdAt, lastDayOfWeek)),
	);

	// Subconsulta para contar as metas completadas durante a semana
	const completedGoalsCount = db.$with("completed_goals_count").as(
		db
			.select({
				goalId: completedGoals.goalId,
				completedCount: count(completedGoals.id).as("completedCount"),
			})
			.from(completedGoals)
			.where(
				and(
					gte(completedGoals.createdAt, firstDayOfWeek),
					lte(completedGoals.createdAt, lastDayOfWeek),
				),
			)
			.groupBy(completedGoals.goalId),
	);

	// Seleciona as metas pendentes com base nas subconsultas
	const pendingGoals = await db
		.with(goalsCreatedUpToWeek, completedGoalsCount)
		.select({
			id: goalsCreatedUpToWeek.id,
			title: goalsCreatedUpToWeek.title,
			desiredWeeklyFrequency: goalsCreatedUpToWeek.desiredWeeklyFrequency,
			completedCount: sql`
                COALESCE(${completedGoalsCount.completedCount}, 0)
            `.mapWith(Number),
		})
		.from(goalsCreatedUpToWeek)
		.leftJoin(
			completedGoalsCount,
			eq(completedGoalsCount.goalId, goalsCreatedUpToWeek.id),
		);

	return { pendingGoals };
}
