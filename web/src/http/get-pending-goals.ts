type PendingGoalsResponse = {
	id: string;
	title: string;
	desiredWeeklyFrequency: number;
	completedCount: number;
}[];

export async function getPendingGoals(): Promise<PendingGoalsResponse> {
	const response = await fetch("http://localhost:3331/pending-goals");
	const data = await response.json();

	return data.pendingGoals;
}
