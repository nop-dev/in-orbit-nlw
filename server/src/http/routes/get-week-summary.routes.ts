import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import { getWeekPendingGoals } from "../../features/get-week-summary";

export const getWeekSummaryRoute: FastifyPluginAsyncZod = async (app) => {
	app.get("/summary", async () => {
		const { summary } = await getWeekPendingGoals();

		return { summary };
	});
};