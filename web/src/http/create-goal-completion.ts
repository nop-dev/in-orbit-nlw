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

	// Verifica se a resposta foi bem-sucedida
	if (response.ok) {
		const contentType = response.headers.get("content-type");

		// Verifica se a resposta contém JSON antes de tentar fazer o parse
		if (contentType?.includes("application/json")) {
			const data = await response.json();

			return data.pendingGoals;
		}
		return null;
	}
	throw new Error(`Failed to complete goal. Status: ${response.status}`);
}
