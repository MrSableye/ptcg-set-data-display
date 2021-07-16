import { Ability, Attack, Card } from 'utility/card';
import {
  AbilitiesFilter,
  AbilityFilter,
  AttackFilter,
  AttacksFilter,
  EnableableFilter,
  Filter,
  FilterPredicate,
  Filters,
  FiltersType,
  RangeFilter,
} from './types';

const toId = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '');

const anyMatch = <T, R>(
  sources: T[],
  targets: R[],
  predicate: (a: T, b: R) => boolean,
) => sources.some((source) => targets.some((target) => predicate(source, target)));

const allMatch = <T, R>(
  sources: T[],
  targets: R[],
  predicate: (a: T, b: R) => boolean,
) => targets.every((target) => sources.some((source) => predicate(source, target)));

const allOrAnyMatch = <T, R>(
  sources: T[],
  targets: R[],
  predicate: (a: T, b: R) => boolean,
  isAny: boolean,
) => (isAny
    ? anyMatch(sources, targets, predicate)
    : allMatch(sources, targets, predicate));

const inRange = (
  value: number,
  min?: number,
  max?: number,
) => ((min || -Infinity) <= value) && ((max || Infinity) >= value);

const falseFilter = () => false;

const filterHp = (card: Card, rangeFilter: RangeFilter) => {
  if (card.hp) {
    const parsedHp = parseInt(card.hp, 10);

    if (!Number.isNaN(parsedHp)) {
      return inRange(parsedHp, rangeFilter.min, rangeFilter.max);
    }
  }

  return false;
};

const filterAttack = (attack: Attack, attackFilter: AttackFilter, attackIndex: number) => {
  const {
    name, text, slot, cost, damage,
  } = attackFilter;

  if (name.enabled && !toId(attack.name).includes(toId(name.value))) {
    return false;
  }

  if (text.enabled && (!attack.text || !toId(attack.text).includes(toId(text.value)))) {
    return false;
  }

  if (slot.enabled && !inRange(attackIndex, slot.value.min, slot.value.max)) {
    return false;
  }

  if (cost.enabled && !inRange(attack.convertedEnergyCost, cost.value.min, cost.value.max)) {
    return false;
  }

  if (damage.enabled) {
    if (attack.damage) {
      let attackDamage = attack.damage;
      const lastCharacter = attack.damage.charAt(attack.damage.length - 1);

      if (lastCharacter === '+') {
        attackDamage = attackDamage.substr(0, attackDamage.length - 1);
      } else if (lastCharacter === '×') {
        attackDamage = attackDamage.substr(0, attackDamage.length - 1);
      } else if (lastCharacter === '-') {
        attackDamage = attackDamage.substr(0, attackDamage.length - 1);
      }

      if (!inRange(+attackDamage, damage.value.min, damage.value.max)) {
        return false;
      }
    } else {
      return false;
    }
  }

  return true;
};

const filterAttacks = (card: Card, attacksFilter: AttacksFilter) => {
  const { attacks } = card;

  if (attacks) {
    return attacksFilter.every((attackFilter) => {
      const { enabled, value } = attackFilter;

      if (enabled) {
        return attacks.some((attack, attackIndex) => filterAttack(attack, value, attackIndex));
      }

      return true;
    });
  }

  return false;
};

const filterAbility = (ability: Ability, abilityFilter: AbilityFilter) => {
  const { name, type, text } = abilityFilter;

  if (name.enabled && !toId(ability.name).includes(toId(name.value))) {
    return false;
  }

  if (type.enabled && !toId(ability.type).includes(toId(type.value))) {
    return false;
  }

  if (text.enabled && !toId(ability.text).includes(toId(text.value))) {
    return false;
  }

  return true;
};

const filterAbilities = (card: Card, abilitiesFilter: AbilitiesFilter) => {
  const { abilities } = card;

  if (abilities) {
    return abilitiesFilter.every((abilityFilter) => {
      const { enabled, value } = abilityFilter;

      if (enabled) {
        const abilitiesAndTraits: Ability[] = [...abilities];

        if (card.ancientTrait) {
          abilitiesAndTraits.push(card.ancientTrait as Ability);
        }

        return abilitiesAndTraits.some((ability) => filterAbility(ability, value));
      }

      return true;
    });
  }

  return false;
};

const configuredFilters: Filters = {
  id: falseFilter,
  name: (source, { query }) => toId(source.name).includes(toId(query)),
  supertype: ({ supertype }, { supertypes }) => supertypes.includes(supertype),
  subtypes: (
    { subtypes },
    { isUnion, types },
  ) => allOrAnyMatch(subtypes || [], types, (a, b) => a === b, isUnion),
  level: ({ level }, { query }) => toId(level || '').includes(toId(query)),
  hp: filterHp,
  types: (
    { types },
    { types: typesQuery, isUnion },
  ) => allOrAnyMatch(types || [], typesQuery, (a, b) => a === b, isUnion),
  evolvesFrom: (
    { evolvesFrom },
    { isEvolution },
  ) => isEvolution === ((evolvesFrom || []).length > 0),
  abilities: filterAbilities,
  attacks: filterAttacks,
  weaknesses: (
    { weaknesses },
    { types },
  ) => anyMatch(weaknesses || [], types, (a, b) => a.type === b),
  retreatCost: falseFilter,
  convertedRetreatCost: (
    { convertedRetreatCost },
    { min, max },
  ) => inRange(convertedRetreatCost || 0, min, max),
  set: falseFilter,
  number: falseFilter,
  artist: falseFilter,
  rarity: (
    { rarity },
    { rarities },
  ) => rarities.some((rarityQuery) => rarity?.includes(rarityQuery)),
  flavorText: ({ flavorText }, { query }) => toId(flavorText || '').includes(toId(query)),
  nationalPokedexNumbers: falseFilter,
  legalities: falseFilter,
  images: falseFilter,
  tcgplayer: falseFilter,
  resistances: (
    { resistances },
    { types },
  ) => anyMatch(resistances || [], types, (a, b) => a.type === b),
  evolvesTo: ({ evolvesTo }, { canEvolve }) => canEvolve === ((evolvesTo || []).length > 0),
  rules: () => false, // TODO
  ancientTrait: falseFilter,
};

export const filterCards = (
  cards: Card[],
  filters: Filter[],
  excludeFilters: Filter[],
) => cards.filter((card) => filters.every((filter) => {
  if (filter) {
    const { name, value } = filter as { name: keyof FiltersType, value: any };
    const filterFunction = configuredFilters[name] as FilterPredicate<Card, any>;

    return filterFunction ? filterFunction(card, value) : false;
  }

  return false;
}) && excludeFilters.every((filter) => {
  if (filter) {
    const { name, value } = filter as { name: keyof FiltersType, value: any };
    const filterFunction = configuredFilters[name] as FilterPredicate<Card, any>;

    return filterFunction ? !filterFunction(card, value) : true;
  }

  return true;
}));

const cardToString = (card: Card): string => {
  const entries = [];

  entries.push(`NAME:${card.name}`);
  entries.push(`SUPERTYPE:${card.supertype}`);
  entries.push(...(card.subtypes || []).sort().map((subtype) => `SUBTYPE:${subtype}`));
  entries.push(`LEVEL:${card.level} || 'NONE`);
  entries.push(`HP:${card.hp || 'NONE'}`);
  entries.push(...(card.types || []).sort().map((type) => `TYPE:${type}`));
  entries.push(...(card.evolvesTo || []).sort().map((evolvesTo) => `EVOLVESTO:${evolvesTo}`));
  entries.push(`RETREAT:${card.convertedRetreatCost || 'NONE'}`);
  entries.push(...(card.rules || []).sort().map((rule) => `RULE:${rule}`));

  const attacks = (card.attacks || []).map((attack) => {
    const attackLines = [];

    attackLines.push(`NAME:${attack.name}`);
    attackLines.push(`COST:${(attack.cost || []).join(',')}`);
    attackLines.push(`DAMAGE:${attack.damage || 'NONE'}`);
    attackLines.push(`TEXT: ${attack.text || 'NONE'}`);

    return `ATTACK:${attackLines.join(';')}`;
  }).sort();
  entries.push(...attacks);

  const abilities = (card.abilities || []).map((ability) => {
    const abilityLines = [];

    abilityLines.push(`NAME:${ability.name}`);
    abilityLines.push(`TYPE:${ability.type}`);
    abilityLines.push(`TEXT:${ability.text}`);

    return `ABILITY:${abilityLines.join(';')}`;
  }).sort();
  entries.push(...abilities);

  const weaknesses = (card.weaknesses || []).map((weakness) => {
    const weaknessLines = [];

    weaknessLines.push(`TYPE:${weakness.type}`);
    weaknessLines.push(`VALUE:${weakness.value}`);

    return `WEAKNESS:${weaknessLines.join(';')}`;
  });
  entries.push(...weaknesses);

  const resistances = (card.resistances || []).map((resistance) => {
    const weaknessLines = [];

    weaknessLines.push(`TYPE:${resistance.type}`);
    weaknessLines.push(`VALUE:${resistance.value}`);

    return `RESISTANCE:${weaknessLines.join(';')}`;
  });
  entries.push(...resistances);

  entries.push(`ANCIENTTRAIT: ${card.ancientTrait ? `${card.ancientTrait.name}:${card.ancientTrait.text}` : 'NONE'}`);

  return entries.join(';');
};

export const filterDuplicateCards = (cards: Card[]): Card[] => {
  const valueMap: Record<string, boolean> = {};

  return cards.filter((card: Card) => {
    const cardText = cardToString(card);

    if (!valueMap[cardText]) {
      valueMap[cardText] = true;
      return true;
    }

    return false;
  });
};

export type {
  AbilitiesFilter,
  AbilityFilter,
  AttackFilter,
  AttacksFilter,
  EnableableFilter,
  Filter,
  RangeFilter,
};
