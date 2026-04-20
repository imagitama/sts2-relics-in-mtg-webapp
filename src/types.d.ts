import type { Rarity } from "./sts";

declare module '*.yaml' {
  const data: Record<string, unknown>;
  export default data;
}

declare module '*.yml' {
  const data: Record<string, unknown>;
  export default data;
}

interface Relic {
  id: string
  name: string
  desc: string
  original: string
  rarity: Rarity
  rules: string // clarifications on how an effect will work
  why: string // why we chose that MTG effect
}
