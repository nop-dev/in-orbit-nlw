import { useEffect, useState } from "react";
import { EmptyGoals } from "./components/empty-goals";
import { Summary } from "./components/summary";
import { Dialog } from "./components/ui/dialog";

type SummaryResponse = {
	completed: number;
	total: number;
	goalsPerDay: Record<
		string,
		{
			id: string;
			title: string;
			completedAt: string;
		}[]
	>;
};

export function App() {
	const [summary, setSummary] = useState<SummaryResponse | null>(null);

	useEffect(() => {
		fetch("http://localhost:3331/summary")
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setSummary(data.summary);
			});
	}, []);

	console.log(summary);

	return (
		<Dialog>
			{summary?.total && summary.total > 0 ? <Summary /> : <EmptyGoals />}
		</Dialog>
	);
}
