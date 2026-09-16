"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { content, type Ability, type CrewMember, type Saga } from "@/content";

/**
 * Homepage — a first cut assembled from the content model (ADR 001).
 * Section order, copy and visual theme are provisional and refined by the
 * design session; everything below is rendered from `src/content`.
 */

function initials(name: string): string {
  const parts = name.split(/\s+/).filter(Boolean);
  return parts
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Hero() {
  const hero = content.hero;
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="flex min-h-[90vh] flex-col items-center justify-center px-6 text-center"
    >
      <p className="text-sm font-medium tracking-wide text-amber-700">
        {hero.kicker}
      </p>
      <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-zinc-900 sm:text-7xl">
        {hero.title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 sm:text-xl">
        {hero.subtitle}
      </p>
      <blockquote className="mt-8 max-w-md border-l-4 border-amber-500 pl-4 text-left text-xl font-semibold italic text-zinc-800">
        “{hero.quote}”
      </blockquote>
      <nav className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <a
          href="#abilities"
          className="rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:border-zinc-400 hover:bg-zinc-100"
        >
          Abilities
        </a>
        <a
          href="#crew"
          className="rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-400"
        >
          Meet the crew
        </a>
        <a
          href="#journey"
          className="rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:border-zinc-400 hover:bg-zinc-100"
        >
          His journey
        </a>
      </nav>
    </motion.section>
  );
}

const typeStyles: Record<Ability["type"], string> = {
  "Devil Fruit": "bg-fuchsia-500/15 text-fuchsia-800",
  Haki: "bg-sky-500/15 text-sky-800",
  Technique: "bg-orange-500/15 text-orange-800",
};

function AbilityCard({ ability, index }: { ability: Ability; index: number }) {
  return (
    <Reveal
      delay={index * 0.08}
      className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <article>
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-bold text-zinc-900">{ability.name}</h3>
          <span
            className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${typeStyles[ability.type]}`}
          >
            {ability.type}
          </span>
        </div>
        <p className="mt-3 text-sm leading-6 text-zinc-600">
          {ability.description}
        </p>
      </article>
    </Reveal>
  );
}

function AbilitiesSection() {
  return (
    <section id="abilities" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
          Abilities
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
          From a rubber body to the drums of liberation — the power that will
          carry Luffy to the top.
        </p>
      </Reveal>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {content.abilities.map((ability, index) => (
          <AbilityCard key={ability.id} ability={ability} index={index} />
        ))}
      </div>
    </section>
  );
}

function CrewCard({ member, index }: { member: CrewMember; index: number }) {
  return (
    <Reveal
      delay={(index % 4) * 0.07}
      className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <article>
        <div
          aria-hidden
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-lg font-bold text-amber-900"
        >
          {initials(member.name)}
        </div>
        <h3 className="mt-3 text-center text-base font-bold text-zinc-900">
          {member.name}
        </h3>
        <p className="text-center text-sm italic text-amber-700">
          “{member.epithet}”
        </p>
        <dl className="mt-3 flex flex-col gap-1 text-sm text-zinc-600">
          <div className="flex justify-between">
            <dt className="text-zinc-500">Role</dt>
            <dd>{member.role}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-zinc-500">Bounty</dt>
            <dd className="font-medium text-zinc-800">
              {member.bounty === null ? "—" : `${member.bounty} B`}
            </dd>
          </div>
        </dl>
        <p className="mt-2 text-xs leading-5 text-zinc-500">{member.tagline}</p>
      </article>
    </Reveal>
  );
}

function CrewSection() {
  return (
    <section id="crew" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
          The Straw Hat Pirates
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
          The crew that will carry their captain to the One Piece.
        </p>
      </Reveal>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {content.crew.map((member, index) => (
          <CrewCard key={member.id} member={member} index={index} />
        ))}
      </div>
    </section>
  );
}

function SagaRow({ saga, index }: { saga: Saga; index: number }) {
  return (
    <Reveal
      delay={index * 0.06}
      className="flex flex-col gap-5 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
    >
      <article className="flex items-start gap-6">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-500 text-lg font-bold text-white">
          {saga.era}
        </span>
        <div>
          <h3 className="text-xl font-bold text-zinc-900">{saga.name}</h3>
          <p className="text-sm font-medium text-zinc-500">{saga.area}</p>
          <p className="mt-2 text-sm leading-6 text-zinc-600">{saga.summary}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {saga.keyEvents.map((event) => (
              <li
                key={event}
                className="rounded-full border border-amber-300 bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-800"
              >
                {event}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Reveal>
  );
}

function JourneySection() {
  return (
    <section id="journey" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
          The road to One Piece
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
          Saga by saga, from a barrel in the East Blue to the New World.
        </p>
      </Reveal>
      <ol className="mt-10 flex flex-col gap-6">
        {content.sagas.map((saga, index) => (
          <SagaRow key={saga.id} saga={saga} index={index} />
        ))}
      </ol>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-6 py-16 text-center">
      <p className="text-sm text-zinc-500">
        Fan-made portfolio — not affiliated with the creators of One Piece.
      </p>
      <p className="mt-1 text-xs text-zinc-400">
        Built with Next.js, Tailwind CSS & framer-motion · content from{" "}
        <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs">
          src/content
        </code>
      </p>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50 font-sans">
      <Hero />
      <AbilitiesSection />
      <CrewSection />
      <JourneySection />
      <Footer />
    </div>
  );
}
