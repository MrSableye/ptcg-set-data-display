import { AbilitiesFilter, AttacksFilter, Filter } from 'utility/filter';

type FilterDataValue<T> = { enabled: boolean, value: T };

interface FilterData {
  name?: FilterDataValue<string>;
  supertype?: FilterDataValue<string[]>;
  subtype?: FilterDataValue<{ subtypes: string[], isUnion: boolean }>;
  type?: FilterDataValue<{ types: string[], isUnion: boolean }>;
  level?: FilterDataValue<string>;
  hp?: FilterDataValue<{ min: number, max: number }>;
  isEvolution?: FilterDataValue<boolean>;
  evolves?: FilterDataValue<boolean>;
  weakness?: FilterDataValue<string[]>;
  resistance?: FilterDataValue<string[]>;
  retreat?: FilterDataValue<{ min: number, max: number }>;
  rarity?: FilterDataValue<string[]>;
  flavorText?: FilterDataValue<string>;
  attacks?: FilterDataValue<AttacksFilter>;
  abilities?: FilterDataValue<AbilitiesFilter>;
}

// eslint-disable-next-line import/prefer-default-export
export const getFilters = ({
  name,
  supertype,
  subtype,
  type,
  level,
  hp,
  isEvolution,
  evolves,
  weakness,
  resistance,
  retreat,
  rarity,
  flavorText,
  attacks,
  abilities,
}: FilterData) => {
  const filters: Filter[] = [];

  if (name && name.enabled) {
    filters.push({ name: 'name', value: { query: name.value } });
  }

  if (supertype && supertype.enabled) {
    filters.push({ name: 'supertype', value: { supertypes: supertype.value } });
  }

  if (subtype && subtype.enabled) {
    filters.push({ name: 'subtypes', value: { isUnion: subtype.value.isUnion, types: subtype.value.subtypes } });
  }

  if (type && type.enabled) {
    filters.push({ name: 'types', value: { isUnion: type.value.isUnion, types: type.value.types } });
  }

  if (level && level.enabled) {
    filters.push({ name: 'level', value: { query: level.value } });
  }

  if (hp && hp.enabled) {
    filters.push({ name: 'hp', value: hp.value });
  }

  if (isEvolution && isEvolution.enabled) {
    filters.push({ name: 'evolvesFrom', value: { isEvolution: isEvolution.value } });
  }

  if (evolves && evolves.enabled) {
    filters.push({ name: 'evolvesTo', value: { canEvolve: evolves.value } });
  }

  if (weakness && weakness.enabled) {
    filters.push({ name: 'weaknesses', value: { types: weakness.value } });
  }

  if (resistance && resistance.enabled) {
    filters.push({ name: 'resistances', value: { types: resistance.value } });
  }

  if (retreat && retreat.enabled) {
    filters.push({ name: 'convertedRetreatCost', value: retreat.value });
  }

  if (rarity && rarity.enabled) {
    filters.push({ name: 'rarity', value: { rarities: rarity.value } });
  }

  if (flavorText && flavorText.enabled) {
    filters.push({ name: 'flavorText', value: { query: flavorText.value } });
  }

  if (attacks && attacks.enabled) {
    filters.push({ name: 'attacks', value: attacks.value });
  }

  if (abilities && abilities.enabled) {
    filters.push({ name: 'abilities', value: abilities.value });
  }

  return filters;
};
