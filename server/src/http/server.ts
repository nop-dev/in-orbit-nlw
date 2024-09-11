import fastify from "fastify";
import { createGoal } from "../features/create-goals";
import z, { number } from "zod";

const app = fastify();

app.post('/goals', async req => {
	const createGoalSchema = z.object({
		title: z.string(),
		desiredWeeklyFrequency: z.number().int().min(1).max(7),
	})

	const body = createGoalSchema.parse(req.body);

	await createGoal({
		title: body.title,
		desiredWeeklyFrequency: body.desiredWeeklyFrequency
	})
})

app
	.listen({
		port: 3331,
	})
	.then(() => {
		console.log("Server running!!! Port: 3331");
	});
