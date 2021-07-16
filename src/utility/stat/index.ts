import { Card } from 'utility/card';
import {
  AttackStats,
  Count,
  OverallStats,
  PokemonStats,
} from './types';

export const computeOverallStats = (cards: Card[]): OverallStats => {
  const typeCounts: Count = { total: 0, individual: {} };
  const subtypeCounts: Count = { total: 0, individual: {} };
  const rarityCounts: Count = { total: 0, individual: {} };

  cards.forEach((card) => {
    if (card.types) {
      typeCounts.total += 1;

      card.types.forEach((type) => {
        if (!typeCounts.individual[type]) {
          typeCounts.individual[type] = 0;
        }

        typeCounts.individual[type] += 1;
      });
    }

    if (card.subtypes) {
      subtypeCounts.total += 1;

      card.subtypes.forEach((subtype) => {
        if (!subtypeCounts.individual[subtype]) {
          subtypeCounts.individual[subtype] = 0;
        }

        subtypeCounts.individual[subtype] += 1;
      });
    }

    if (card.rarity) {
      rarityCounts.total += 1;

      if (!rarityCounts.individual[card.rarity]) {
        rarityCounts.individual[card.rarity] = 0;
      }

      rarityCounts.individual[card.rarity] += 1;
    }
  });

  return {
    cardCount: cards.length,
    typeCounts,
    subtypeCounts,
    rarityCounts,
  };
};

export const computePokemonStats = (cards: Card[]): PokemonStats => {
  let pokemonCount = 0;
  let hp = 0;
  const abilityCounts: Count = { total: 0, individual: {} };
  const attackStats: AttackStats[] = [];
  const attackStatsByCost: AttackStats[] = [];
  let retreatCount = 0;

  cards.forEach((card) => {
    if (card.supertype === 'Pokémon') {
      pokemonCount += 1;
      retreatCount += card.convertedRetreatCost || 0;

      if (card.attacks) {
        card.attacks.forEach((attack, attackIndex) => {
          if (!attackStats[attackIndex]) {
            attackStats[attackIndex] = {
              moveCount: 0,
              moveCost: 0,
              costTypeStats: { total: 0, individual: {} },
              damageMoveCount: 0,
              damage: 0,
              timesDamageCount: 0,
              plusDamageCount: 0,
              minusDamageCount: 0,
              moveEffectCount: 0,
            };
          }

          if (!attackStatsByCost[attack.convertedEnergyCost]) {
            attackStatsByCost[attack.convertedEnergyCost] = {
              moveCount: 0,
              moveCost: 0,
              costTypeStats: { total: 0, individual: {} },
              damageMoveCount: 0,
              damage: 0,
              timesDamageCount: 0,
              plusDamageCount: 0,
              minusDamageCount: 0,
              moveEffectCount: 0,
            };
          }

          const attackStat = attackStats[attackIndex];
          const attackStatByCost = attackStatsByCost[attack.convertedEnergyCost];

          (attack.cost || []).forEach((cost) => {
            if (cost) {
              if (!attackStat.costTypeStats.individual[cost]) {
                attackStat.costTypeStats.individual[cost] = 0;
              }

              if (!attackStatByCost.costTypeStats.individual[cost]) {
                attackStatByCost.costTypeStats.individual[cost] = 0;
              }

              attackStat.costTypeStats.individual[cost] += 1;
              attackStatByCost.costTypeStats.individual[cost] += 1;
              attackStat.costTypeStats.total += 1;
              attackStatByCost.costTypeStats.total += 1;
            }
          });

          attackStat.moveCount += 1;
          attackStatByCost.moveCount += 1;
          attackStat.moveCost += attack.convertedEnergyCost;
          attackStatByCost.moveCost += attack.convertedEnergyCost;

          if (attack.text) {
            attackStat.moveEffectCount += 1;
            attackStatByCost.moveEffectCount += 1;
          }

          if (attack.damage) {
            attackStat.damageMoveCount += 1;
            attackStatByCost.damageMoveCount += 1;

            let attackDamage = attack.damage;
            const lastCharacter = attack.damage.charAt(attack.damage.length - 1);

            if (lastCharacter === '+') {
              attackStat.plusDamageCount += 1;
              attackStatByCost.plusDamageCount += 1;
              attackDamage = attackDamage.substr(0, attackDamage.length - 1);
            } else if (lastCharacter === '×') {
              attackStat.timesDamageCount += 1;
              attackStatByCost.timesDamageCount += 1;
              attackDamage = attackDamage.substr(0, attackDamage.length - 1);
            } else if (lastCharacter === '-') {
              attackStat.minusDamageCount += 1;
              attackStatByCost.minusDamageCount += 1;
              attackDamage = attackDamage.substr(0, attackDamage.length - 1);
            }

            attackStat.damage += +attackDamage;
            attackStatByCost.damage += +attackDamage;
          }
        });
      }

      if (card.abilities) {
        abilityCounts.total += 1;

        card.abilities.forEach((ability) => {
          if (!abilityCounts.individual[ability.type]) {
            abilityCounts.individual[ability.type] = 0;
          }

          abilityCounts.individual[ability.type] += 1;
        });
      }

      if (card.hp) {
        hp += +card.hp;
      }
    }
  });

  return {
    count: pokemonCount,
    hp,
    abilityCounts,
    retreatCount,
    attackStats,
    attackStatsByCost,
  };
};

export type {
  AttackStats,
  Count,
  OverallStats,
  PokemonStats,
};
