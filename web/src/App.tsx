import { useQuery } from "@tanstack/react-query";
import { EmptyGoals } from "./components/empty-goals";
import { Summary } from "./components/summary";
import { Dialog } from "@radix-ui/react-dialog";
import { getSummary } from "./http/get-summary";
import { CreateGoal } from "./components/create-goal";

export function App() {
	const { data } = useQuery({
		queryKey: ["summary"],
		queryFn: getSummary,
		staleTime: 1000 * 60 // 60 secs
	});

	return (
		<Dialog>
			{data?.total && data.total > 0 ? <Summary /> : <EmptyGoals />}

			<CreateGoal />
		</Dialog>
	);
}
