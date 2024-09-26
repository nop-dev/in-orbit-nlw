import { useQuery } from "@tanstack/react-query";
import { GoPlus } from "react-icons/go";
import { getPendingGoals } from "../http/get-pending-goals";
import { OutlineButton } from "./ui/outline-button";
import { createGoalCompletion } from "../http/create-goal-completion";

export function PendingGoals() {
	const { data } = useQuery({
		queryKey: ["pending-goals"],
		queryFn: getPendingGoals,
	});

	if (!data) {
		return null;
	}

  async function handleCompleteGoal(goalId: string) {
    await createGoalCompletion(goalId)
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
