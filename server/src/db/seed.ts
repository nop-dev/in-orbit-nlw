import { client, db } from ".";
import { completedGoals, goals } from "./schema";

import dayjs from "dayjs";

async function seed() {
	await db.delete(completedGoals);
	await db.delete(goals);

	const result = await db
		.insert(goals)
		.values([
			{ title: "Acordar cedo", desiredWeeklyFrequency: 5 },
			{ title: "Estudar", desiredWeeklyFrequency: 4 },
			{ title: "Ir pra academia", desiredWeeklyFrequency: 7 },
			{ title: "Arrumar o quarto", desiredWeeklyFrequency: 1 },
			{ title: "Limpar mesa de trabalho", desiredWeeklyFrequency: 2 },
		])
		.returning();

	const startOfWeek = dayjs().startOf('week');

	await db.insert(completedGoals).values([
		{ goalId: result[0].id, createdAt: startOfWeek.toDate() },
		{ goalId: result[1].id, createdAt: startOfWeek.add(1, 'day').toDate() }
	]);
}

seed().finally(() => {
	client.end();
});
