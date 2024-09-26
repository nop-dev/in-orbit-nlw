import { useQuery } from "@tanstack/react-query";
import { GoPlus } from "react-icons/go";
import { getPendingGoals } from "../http/get-pending-goals";
import { OutlineButton } from "./ui/outline-button";

export function PendingGoals() {
	const { data } = useQuery({
		queryKey: ["pending-goals"],
		queryFn: getPendingGoals,
	});

	if (!data) {
		return null;
	}

	return (
		<div className="flex gap-3 flex-wrap">
			{data.map((goal) => {
				return (
					<OutlineButton
						key={goal.id}
						disabled={goal.completedCount >= goal.desiredWeeklyFrequency}
					>
						<GoPlus className="size-4 text-zinc-600" />
						{goal.title}
					</OutlineButton>
				);
			})}
		</div>
	);
}
