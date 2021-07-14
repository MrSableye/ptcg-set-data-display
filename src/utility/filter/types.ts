import { Card } from 'utility/card';

export type Filter = {
  [K in keyof Card]: {
    name: K,
    value: FiltersType[K],
  }
}[keyof Card]

export type FilterPredicate<T, F> = (source: T, filter: F) => boolean;

export interface RangeFilter {
  min: number;
  max: number;
}

export interface EnableableFilter<T> {
  enabled: boolean;
  value: T;
}

export interface AttackFilter {
  name: EnableableFilter<string>;
  text: EnableableFilter<string>;
  slot: EnableableFilter<RangeFilter>;
  cost: EnableableFilter<RangeFilter>;
  damage: EnableableFilter<RangeFilter>;
}

export type AttacksFilter = EnableableFilter<AttackFilter>[];

export interface AbilityFilter {
  name: EnableableFilter<string>;
  type: EnableableFilter<string>;
  text: EnableableFilter<string>;
}

export type AbilitiesFilter = EnableableFilter<AbilityFilter>[];

export interface FiltersType {
  id: never;
  name: { query: string };
  supertype: { supertypes: string[] };
  subtypes: { isUnion: boolean, types: string[] };
  level: { query: string };
  hp: RangeFilter;
  types: { isUnion: boolean, types: string[] };
  evolvesFrom: { isEvolution: boolean };
  abilities: AbilitiesFilter;
  attacks: AttacksFilter;
  weaknesses: { types: string[] };
  retreatCost: never;
  convertedRetreatCost: RangeFilter;
  set: never;
  number: never;
  artist: never;
  rarity: { rarities: string[] };
  flavorText: { query: string };
  nationalPokedexNumbers: never;
  legalities: never;
  images: never;
  tcgplayer: never;
  resistances: { types: string[] };
  evolvesTo: { canEvolve: boolean };
  rules: string; // TODO: THIS
  ancientTrait: never;
}

export type Filters = {
  [K in keyof Card]: FilterPredicate<Card, FiltersType[K]>;
}
