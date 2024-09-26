import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GoPlus } from "react-icons/go";
import { createGoalCompletion } from "../http/create-goal-completion";
import { getPendingGoals } from "../http/get-pending-goals";
import { OutlineButton } from "./ui/outline-button";

export function PendingGoals() {
	const queryClient = useQueryClient();

	const { data } = useQuery({
		queryKey: ["pending-goals"],
		queryFn: getPendingGoals,
		staleTime: 1000 * 60, // 60 secs
	});

	if (!data) {
		return null;
	}

	async function handleCompleteGoal(goalId: string) {
		try {
			await createGoalCompletion(goalId);

			await queryClient.invalidateQueries({
				queryKey: ["summary"],
			});
		} catch (error) {
			console.error("Error completing goal:", error);
		}
	}

	return (
		<div className="flex gap-3 flex-wrap">
			{data.map((goal) => {
				return (
					<OutlineButton
						key={goal.id}
						disabled={goal.completedCount >= goal.desiredWeeklyFrequency}
						onClick={() => handleCompleteGoal(goal.id)}
					>
						<GoPlus className="size-4 text-zinc-600" />
						{goal.title}
					</OutlineButton>
				);
			})}
		</div>
	);
}
