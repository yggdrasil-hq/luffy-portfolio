/**
 * Central content model (provisional first cut — ADR 001, "Suggested initial
 * content model").
 *
 * This file is the single source of truth for the site's content. Page
 * components consume it and render each entry. The exact shape is provisional:
 * the design session (`designs/`) and the first UI features refine it further.
 * All content is static — no backend, no database, no external APIs.
 */

export type AbilityType = "Devil Fruit" | "Haki" | "Technique";

export interface Ability {
  id: string;
  name: string;
  type: AbilityType;
  description: string;
}

export interface CrewMember {
  id: string;
  name: string;
  role: string;
  epithet: string;
  /** Berries. `null` when no bounty is known. */
  bounty: string | null;
  tagline: string;
  /**
   * Portrait path under `public/`. Assets land in a later design/build pass —
   * cards render the member's initials until an image exists.
   */
  image?: string;
}

export interface Saga {
  id: string;
  /** Display order along the timeline (1 = earliest). */
  era: number;
  name: string;
  area: string;
  summary: string;
  keyEvents: string[];
}

export interface SiteContent {
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
    quote: string;
  };
  abilities: Ability[];
  crew: CrewMember[];
  sagas: Saga[];
}

export const content: SiteContent = {
  hero: {
    kicker: "Fan-made portfolio · One Piece",
    title: "Monkey D. Luffy",
    subtitle:
      "Captain of the Straw Hat Pirates, and the man who will become King of the Pirates.",
    quote: "I'm gonna be King of the Pirates!",
  },
  abilities: [
    {
      id: "hito-hito-no-mi-nika",
      name: "Hito Hito no Mi, Model: Nika",
      type: "Devil Fruit",
      description:
        "A Mythical Zoan that awakens into the legendary 'Sun God Nika' form — a body with rubber-like freedom and the power to turn imagination into reality.",
    },
    {
      id: "gear-5",
      name: "Gear 5",
      type: "Technique",
      description:
        "The awakened form. Luffy's heartbeat pounds in the 'Drums of Liberation' as he fights with a smile, bending the rules of the fight itself.",
    },
    {
      id: "conquerors-haki",
      name: "Conqueror's Haki",
      type: "Haki",
      description:
        "The rarest form of Haki, the will of a king. Luffy's presence can overwhelm the weak-willed — and it coats his strongest attacks in advanced form.",
    },
    {
      id: "observation-haki",
      name: "Observation Haki",
      type: "Haki",
      description:
        "The ability to sense the presence and intent of others, letting Luffy perceive danger an instant before it arrives.",
    },
  ],
  crew: [
    {
      id: "luffy",
      name: "Monkey D. Luffy",
      role: "Captain",
      epithet: "Straw Hat Luffy",
      bounty: "3,000,000,000",
      tagline: "The future King of the Pirates.",
    },
    {
      id: "zoro",
      name: "Roronoa Zoro",
      role: "First Mate / Swordsman",
      epithet: "Pirate Hunter Zoro",
      bounty: "1,111,000,000",
      tagline: "Three-sword style, one goal: the World's Strongest Swordsman.",
    },
    {
      id: "nami",
      name: "Nami",
      role: "Navigator",
      epithet: "Cat Burglar Nami",
      bounty: "366,000,000",
      tagline: "The navigator who can read any sea — and draw any world map.",
    },
    {
      id: "usopp",
      name: "Usopp",
      role: "Sniper",
      epithet: "'God' Usopp",
      bounty: "500,000,000",
      tagline: "A brave warrior of the sea who never misses.",
    },
    {
      id: "sanji",
      name: "Sanji",
      role: "Cook",
      epithet: "Black Leg Sanji",
      bounty: "1,032,000,000",
      tagline: "The cook who never lets a hungry soul starve.",
    },
    {
      id: "chopper",
      name: "Tony Tony Chopper",
      role: "Doctor",
      epithet: "Cotton Candy Lover Chopper",
      bounty: "1,000",
      tagline: "A reindeer doctor who can cure almost anything.",
    },
    {
      id: "robin",
      name: "Nico Robin",
      role: "Archaeologist",
      epithet: "Devil Child Robin",
      bounty: "930,000,000",
      tagline: "The only person alive who can read the Poneglyphs.",
    },
    {
      id: "franky",
      name: "Franky",
      role: "Shipwright",
      epithet: "Iron Man Franky",
      bounty: "394,000,000",
      tagline: "The cyborg who built the Thousand Sunny.",
    },
    {
      id: "brook",
      name: "Brook",
      role: "Musician",
      epithet: "Soul King Brook",
      bounty: "383,000,000",
      tagline: "A skeleton musician with a song in his (hollow) heart.",
    },
    {
      id: "jimbe",
      name: "Jinbe",
      role: "Helmsman",
      epithet: "Knight of the Sea Jinbe",
      bounty: "1,100,000,000",
      tagline: "A Fish-Man warrior who steers the ship through any storm.",
    },
  ],
  sagas: [
    {
      id: "east-blue",
      era: 1,
      name: "East Blue Saga",
      area: "East Blue",
      summary:
        "Luffy sets sail alone in a barrel, recruits his first friends, and defeats the most dangerous pirates of the East Blue.",
      keyEvents: ["Zoro joins", "Defeats Arlong", "Nami joins"],
    },
    {
      id: "alabasta",
      era: 2,
      name: "Alabasta Saga",
      area: "Grand Line",
      summary:
        "The crew enters the Grand Line, climbs the Reverse Mountain, and fights to save the desert kingdom of Alabasta from civil war.",
      keyEvents: ["Baroque Works", "Robin joins", "Defeats Crocodile"],
    },
    {
      id: "water-7",
      era: 3,
      name: "Water 7 & Enies Lobby",
      area: "Paradise",
      summary:
        "Betrayal, a burning ship, and a declaration of war on the World Government to bring Nico Robin back.",
      keyEvents: [
        "Franky joins",
        "The Going Merry's end",
        "Declaration of war",
      ],
    },
    {
      id: "summit-war",
      era: 4,
      name: "Summit War Saga",
      area: "Sabaody · Marineford",
      summary:
        "The crew is scattered, and Luffy fights through Impel Down to Marineford to save his brother Ace.",
      keyEvents: [
        "Kuma scatters the crew",
        "Impel Down",
        "Marineford",
        "Timeskip",
      ],
    },
    {
      id: "wano",
      era: 5,
      name: "Wano Country Saga",
      area: "New World",
      summary:
        "Alliances rise as Luffy frees Wano from Kaido and awakens the power of the Sun God Nika.",
      keyEvents: ["Alliance with Law & Kid", "Defeats Kaido", "Awakening"],
    },
    {
      id: "final-saga",
      era: 6,
      name: "Final Saga",
      area: "New World",
      summary:
        "The race for the One Piece begins in earnest: Egghead, Elbaf, and the final confrontation for the title of Pirate King.",
      keyEvents: ["Egghead", "Elbaf", "One Piece"],
    },
  ],
};
