import { GoPlus } from "react-icons/go";
import ilustration from "./assets/illustration.svg";
import logoname from "./assets/logoname.svg";

export function App() {
	return (
		<div className="h-screen flex flex-col items-center justify-center gap-8 font-inter">
			<img src={logoname} alt="in.orbit" />
			<img src={ilustration} alt="Let's start!" />

			<p className="text-zinc-300 leading-relaxed max-w-80 text-center">
				Você ainda não cadastrou nenhuma meta, que tal cadastrar um agora mesmo?
			</p>

			<button type="button" className="px-4 py-2.5 rounded-lg bg-violet-500 text-violet-50 flex items-center gap-1.5 text-sm font-medium tracking-tight hover:bg-violet-600">
				<GoPlus className="size-4" />
				Cadastrar meta
			</button>
		</div>
	);
}
