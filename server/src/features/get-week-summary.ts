import { db } from "../db";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { completedGoals, goals } from "../db/schema";
import { lte, gte, and, count, eq, sql } from "drizzle-orm";

export async function getWeekPendingGoals() {
	const firstDayOfWeek = dayjs().startOf("week").toDate();
	const lastDayOfWeek = dayjs().endOf("week").toDate();

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
	const goalsCompletedInWeek = db.$with("goals_completed_in_week").as(
		db
			.select({
				id: completedGoals.id,
				title: goals.title,
				completedAt: completedGoals.createdAt,
				completedAtDate: sql /*sql*/`
                DATE(${completedGoals.createdAt})
            `.as("completedAtDate"),
			})
			.from(completedGoals)
			.innerJoin(goals, eq(goals.id, completedGoals.goalId))
			.where(
				and(
					gte(completedGoals.createdAt, firstDayOfWeek),
					lte(completedGoals.createdAt, lastDayOfWeek),
				),
			),
	);

	const goalsCompletedByWeekDay = db.$with("goals_completed_by_week_day").as(
		db
			.select({
				completedAtDate: goalsCompletedInWeek.completedAtDate,
				completions: sql`
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', ${goalsCompletedInWeek.id},
                        'title', ${goalsCompletedInWeek.title},
                        'completedAt', ${goalsCompletedInWeek.completedAt}
                    )
                )
            `.as("completions"),
			})
			.from(goalsCompletedInWeek)
			.groupBy(goalsCompletedInWeek.completedAtDate),
	);

	const result = await db
		.with(goalsCreatedUpToWeek, goalsCompletedInWeek, goalsCompletedByWeekDay)
		.select({
			completed: sql`(SELECT COUNT(*) FROM ${goalsCompletedInWeek})`.mapWith(
				Number,
			),

			total:
				sql`(SELECT SUM(${goalsCreatedUpToWeek.desiredWeeklyFrequency}) FROM ${goalsCreatedUpToWeek})`.mapWith(
					Number,
				),

			goalsPerDay: sql`JSON_OBJECT_AGG(
                ${goalsCompletedByWeekDay.completedAtDate},
                ${goalsCompletedByWeekDay.completions}
            )`,
		})
		.from(goalsCompletedByWeekDay);

	return {
		summary: result,
	};
}
