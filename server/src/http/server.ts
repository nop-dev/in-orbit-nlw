import fastifyCors from "@fastify/cors";
import fastify from "fastify";
import {
	type ZodTypeProvider,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { getWeekSummaryRoute } from "./routes/get-week-summary.routes";

import { createGoalCompletionRoute } from "./routes/complete-a-goal.routes";
import { createGoalRoute } from "./routes/create-a-goal.routes";
import { getPendingGoalsRoute } from "./routes/get-pending-goals.routes";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
	origin: "*",
});

app.register(createGoalRoute);
app.register(createGoalCompletionRoute);
app.register(getPendingGoalsRoute);
app.register(getWeekSummaryRoute);

app
	.listen({
		port: 3331,
	})
	.then(() => {
		console.log("Server running!!! Port: 3331");
	});
