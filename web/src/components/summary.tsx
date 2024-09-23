import { GoPlus, GoCheckCircle } from "react-icons/go";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";
import { InOrbitIcon } from "./in-orbit-icon";
import { Progress, ProgressIndicator } from "./ui/progress-bar";
import { Separator } from "./ui/separator";
import { OutlineButton } from "./ui/outline-button";

export function Summary() {
  return(
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold">5 a 10 de Agosto</span>
          <InOrbitIcon />
        </div>
        

      <DialogTrigger asChild>
						<Button size="sm">
								<GoPlus className="size-4" />
								Cadastrar meta
						</Button>
					</DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress max={15} value={8}>
          <ProgressIndicator style={ { width: '50%' } }/>
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>Você completou <span className="text-zinc-100">8</span> de <span className="text-zinc-100">15</span> metas nessa semana.</span>
          <span>50%</span>
        </div>
      </div>

      <Separator />

      <div className="flex gap-3 flex-wrap">
        <OutlineButton>
          <GoPlus className="size-4 text-zinc-600" />
          Estudar
        </OutlineButton>

        <OutlineButton>
          <GoPlus className="size-4 text-zinc-600" />
          Praticar exercício
        </OutlineButton>

        <OutlineButton>
          <GoPlus className="size-4 text-zinc-600" />
          Arumar o quarto
        </OutlineButton>

        <OutlineButton>
          <GoPlus className="size-4 text-zinc-600" />
          Lavar a louça
        </OutlineButton>
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Sua semana</h2>

        <div className="flex flex-col gap-4">
          <h3 className="font-medium">Terça <span className="text-zinc-400 text-xs">(10 de Agosto)</span></h3>

          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2">
              <GoCheckCircle className="size-4 text-pink-500" />
              <span className="text-sm text-zinc-400">Você completou <span className="text-zinc-100">"Acordar Cedo"</span> as <span className="text-zinc-100">07:15</span></span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-medium">Quinta <span className="text-zinc-400 text-xs">(10 de Agosto)</span></h3>

          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2">
              <GoCheckCircle className="size-4 text-pink-500" />
              <span className="text-sm text-zinc-400">Você completou <span className="text-zinc-100">"Acordar Cedo"</span> as <span className="text-zinc-100">07:15h</span></span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-medium">Sexta <span className="text-zinc-400 text-xs">(10 de Agosto)</span></h3>

          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2">
              <GoCheckCircle className="size-4 text-pink-500" />
              <span className="text-sm text-zinc-400">Você completou <span className="text-zinc-100">"Acordar Cedo"</span> as <span className="text-zinc-100">07:15h</span></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )

}