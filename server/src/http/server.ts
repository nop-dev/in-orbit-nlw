import fastify from "fastify";
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod";

import { createGoalRoute } from "./routes/create-a-goal.routes";
import { createGoalCompletionRoute } from "./routes/complete-a-goal.routes";
import { getPendingGoalsRoute } from "./routes/get-pending-goals.routes";
import { getWeekSummaryRoute } from "./routes/get-week-summary.routes";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createGoalRoute)
app.register(createGoalCompletionRoute)
app.register(getPendingGoalsRoute)
app.register(getWeekSummaryRoute)

app
	.listen({
		port: 3331,
	})
	.then(() => {
		console.log("Server running!!! Port: 3331");
	});
