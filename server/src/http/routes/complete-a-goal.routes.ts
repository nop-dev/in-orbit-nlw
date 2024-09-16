import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';

import { createGoalCompletion } from '../../features/create-goal-completion';

export const createGoalCompletionRoute: FastifyPluginAsyncZod = async (app) => {
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
};