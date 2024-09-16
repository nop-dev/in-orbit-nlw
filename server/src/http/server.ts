import fastify from "fastify";
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod";

import { createGoalRoute } from "./routes/create-a-goal";
import { createGoalCompletionRoute } from "./routes/complete-a-goal";
import { getPendingGoalsRoute } from "./routes/get-pending-goals";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createGoalRoute)
app.register(createGoalCompletionRoute)
app.register(getPendingGoalsRoute)

app
	.listen({
		port: 3331,
	})
	.then(() => {
		console.log("Server running!!! Port: 3331");
	});
