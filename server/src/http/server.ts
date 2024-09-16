import fastify from "fastify";
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

import { createGoal } from "../features/create-goals";
import { getWeekPendingGoals } from "../features/get-week-pending-goals";
import { createGoalCompletion } from "../features/create-goal-completion";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.get('/pending-goals', async () => {
	 const { pendingGoals } = await getWeekPendingGoals()

	 return { pendingGoals }
})

app.post('/goals',
	{
	  schema: {
	  	  body: z.object({
		      title: z.string(),
			  desiredWeeklyFrequency: z.number().int().min(1).max(7),
			}),
		}
},
async req => {
	const { title, desiredWeeklyFrequency } = req.body;
	
	await createGoal({
		title,
		desiredWeeklyFrequency,
	})
});

app.post('/completion',
	{
	  schema: {
	  	  body: z.object({
		      goalId: z.string(),
			}),
		}
},
async req => {
	const { goalId } = req.body;
	
	await createGoalCompletion({
		goalId
	})
});

app
	.listen({
		port: 3331,
	})
	.then(() => {
		console.log("Server running!!! Port: 3331");
	});
