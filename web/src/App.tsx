import { GoPlus } from "react-icons/go";
import ilustration from "./assets/illustration.svg";
import logoname from "./assets/logoname.svg";

import { Button } from "./components/ui/button";
import { Dialog, DialogTrigger } from "./components/ui/dialog";
import { CreateGoal } from "./components/create-goal";


export function App() {
	return (
		<Dialog>
				<div className="h-screen flex flex-col items-center justify-center gap-8 font-inter">
					<img src={logoname} alt="in.orbit" />
					<img src={ilustration} alt="Let's start!" />

					<p className="text-zinc-300 leading-relaxed max-w-80 text-center">
						Você ainda não cadastrou nenhuma meta, que tal cadastrar um agora mesmo?
					</p>

					<DialogTrigger asChild>
						<Button>
								<GoPlus className="size-4" />
								Cadastrar meta
						</Button>
					</DialogTrigger>
				</div>

				<CreateGoal />
		</Dialog>
	);
}
