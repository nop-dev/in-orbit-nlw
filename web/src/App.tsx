import { GoPlus, GoX } from "react-icons/go";
import ilustration from "./assets/illustration.svg";
import logoname from "./assets/logoname.svg";

import { Button } from "./components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./components/ui/dialog";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { RadioGroup, RadioGroupIndicator, RadioGroupItem } from "./components/ui/radio-group";

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

				<DialogContent>
					<div className="flex flex-col gap-6 h-full">
						<div className="flex flex-col gap-3">
							<div className="flex items-center justify-between">
								<DialogTitle>Cadastrar Meta</DialogTitle>

								<DialogClose><GoX className="size-5 text-zinc-600"/></DialogClose>
							</div>

							<DialogDescription>Adicione atividades que <span className="underline">te fazem bem</span> e que você quer continuar praticando toda semana.</DialogDescription>
						</div>

						<form action="" className="flex-1 flex flex-col justify-between">
							<div className="flex flex-col gap-6">
								<div className="flex flex-col gap-2">
									<Label htmlFor="title">Qual a atividade?</Label>
									<Input autoFocus id="title" placeholder="Praticar exercícios, estudar, etc...">
									
									</Input>
								</div>

								<div className="flex flex-col gap-2">
								<Label htmlFor="title">Quantas vezes na semana?</Label>

								<RadioGroup>
										<RadioGroupItem value="1">
											<RadioGroupIndicator />
											<span className="text-zinc-300 text-sm leading-none">1x na Semana</span>
											<span className="text-lg leading-none">🥱</span>
										</RadioGroupItem>
									</RadioGroup>

									<RadioGroup>
										<RadioGroupItem value="2">
											<RadioGroupIndicator />
											<span className="text-zinc-300 text-sm leading-none">2x na Semana</span>
											<span className="text-lg leading-none">🙂</span>
										</RadioGroupItem>
									</RadioGroup>

									<RadioGroup>
										<RadioGroupItem value="3">
											<RadioGroupIndicator />
											<span className="text-zinc-300 text-sm leading-none">3x na Semana</span>
											<span className="text-lg leading-none">😎</span>
										</RadioGroupItem>
									</RadioGroup>

									<RadioGroup>
										<RadioGroupItem value="4">
											<RadioGroupIndicator />
											<span className="text-zinc-300 text-sm leading-none">4x na Semana</span>
											<span className="text-lg leading-none">😜</span>
										</RadioGroupItem>
									</RadioGroup>
									
									<RadioGroup>
										<RadioGroupItem value="5">
											<RadioGroupIndicator />
											<span className="text-zinc-300 text-sm leading-none">5x na Semana</span>
											<span className="text-lg leading-none">🤨</span>
										</RadioGroupItem>
									</RadioGroup>

									<RadioGroup>
										<RadioGroupItem value="6">
											<RadioGroupIndicator />
											<span className="text-zinc-300 text-sm leading-none">6x na Semana</span>
											<span className="text-lg leading-none">🤯</span>
										</RadioGroupItem>
									</RadioGroup>

									<RadioGroup>
										<RadioGroupItem value="7">
											<RadioGroupIndicator />
											<span className="text-zinc-300 text-sm leading-none">Todos os dias da Semana</span>
											<span className="text-lg leading-none">🔥</span>
										</RadioGroupItem>
									</RadioGroup>
									
								</div>
							</div>

							<div className="flex items-center gap-3 w-full">
								<DialogClose asChild>
									<Button type="button" className="flex-1" variant="secondary">Fechar</Button>
								</DialogClose>

								<Button className="flex-1">Salvar</Button>
							</div>
						</form>
					</div>
				</DialogContent>
			
		</Dialog>
	);
}
