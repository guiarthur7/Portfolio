import { ContainerScroll } from "@/components/ui/container-scroll-animation"
import { certifications, cyber, cyberSkills, labs, stats } from "@/content/cyber"
import { site } from "@/content/site"

const user = site.name.split(" ")[0].toLowerCase()

function Prompt({ command, children }: { command: string; children?: React.ReactNode }) {
  return (
    <p className="mt-3 first:mt-0 sm:mt-4">
      <span className="text-emerald-400">{user}@portfolio</span>
      <span className="text-white/40">:</span>
      <span className="text-sky-400">~</span>
      <span className="text-white/40">$ </span>
      <span className="text-white">{command}</span>
      {children}
    </p>
  )
}

/** Écran qui se redresse au défilement et affiche le profil sous forme de terminal. */
export function TerminalShowcase() {
  return (
    <ContainerScroll
      titleComponent={
        <>
          <p className="text-sm font-medium text-white/50">Profil</p>
          <h2 className="mt-2 mb-20 text-4xl font-semibold tracking-tight text-white sm:text-6xl md:mb-28">
            Ouvrez une session
            <br />
            <span className="font-display text-5xl leading-none font-normal text-emerald-300 md:text-[6rem]">
              sur mon terminal.
            </span>
          </h2>
        </>
      }
    >
      <div className="flex h-full flex-col bg-[#0b0f0d] font-mono text-xs leading-relaxed text-white/70 sm:text-sm">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="size-3 rounded-full bg-red-400/80" />
          <span className="size-3 rounded-full bg-amber-400/80" />
          <span className="size-3 rounded-full bg-emerald-400/80" />
          <span className="ml-3 truncate text-white/40">{user}@portfolio: ~</span>
        </div>

        <div className="flex-1 overflow-hidden p-4 sm:p-6">
          <Prompt command="whoami" />
          <p>
            {site.name} — {cyber.role}
          </p>

          <Prompt command="ls labs/" />
          <ul>
            {labs.map((l) => (
              <li key={l.title}>
                <span className="text-emerald-400">▸</span> {l.title}{" "}
                <span className="hidden text-white/40 sm:inline">— {l.stack.join(", ")}</span>
              </li>
            ))}
          </ul>

          <Prompt command="cat classements.txt" />
          <p className="text-pretty">
            {stats.map((s, i) => (
              <span key={s.label}>
                {i > 0 && <span className="text-white/40"> · </span>}
                <span className="text-amber-300">{s.value}</span> {s.label}
              </span>
            ))}
          </p>

          <Prompt command="ls certifications/" />
          <ul className="grid grid-cols-2 gap-x-6">
            {certifications.map((c) => (
              <li key={c.name}>
                <span className="text-sky-300">{c.name}</span> <span className="text-white/40">— {c.status}</span>
              </li>
            ))}
          </ul>

          {/* Écran trop court sur mobile : les compétences sont détaillées plus bas dans la page */}
          <div className="hidden sm:mt-4 sm:block">
            <Prompt command="cat competences.txt | head" />
            <p className="text-pretty">
              {cyberSkills
                .filter((s) => s.group !== "Soft skills")
                .flatMap((s) => s.items)
                .join(" · ")}
            </p>
          </div>

          <Prompt command="./contact.sh" />
          <p>
            <span className="text-emerald-400">[+]</span> {cyber.email}
          </p>

          <Prompt command="">
            <span aria-hidden className="inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-emerald-400" />
          </Prompt>
        </div>
      </div>
    </ContainerScroll>
  )
}
