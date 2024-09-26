export async function createGoalCompletion(goalId: string) {
	const response = await fetch("http://localhost:3331/completion", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			goalId,
		}),
	});
	const data = await response.json();

	return data.pendingGoals;
}
