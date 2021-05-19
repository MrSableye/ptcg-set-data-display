import { Card } from 'utility/card';
import {
  AttackStats,
  Count,
  OverallStats,
  PokemonStats,
} from './types';

export const computeOverallStats = (cards: Card[]): OverallStats => {
  let typeCounts: Count = { total: 0, individual: {} };
  let subtypeCounts: Count = { total: 0, individual: {} };
  let rarityCounts: Count = { total: 0, individual: {} };

  cards.forEach((card) => {
    if (card.types) {
      typeCounts.total++;

      card.types.forEach((type) => {
        if (!typeCounts.individual[type]) {
          typeCounts.individual[type] = 0;
        }

        typeCounts.individual[type]++;
      });
    }

    if (card.subtypes) {
      subtypeCounts.total++;

      card.subtypes.forEach((subtype) => {
        if (!subtypeCounts.individual[subtype]) {
          subtypeCounts.individual[subtype] = 0;
        }

        subtypeCounts.individual[subtype]++;
      });
    }

    if (card.rarity) {
      rarityCounts.total++;

      if (!rarityCounts.individual[card.rarity]) {
        rarityCounts.individual[card.rarity] = 0;
      }

      rarityCounts.individual[card.rarity]++;
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
  let abilityCount = 0;
  let attackStats: AttackStats[] = [];
  let attackStatsByCost: AttackStats[] = [];
  let retreatCount = 0;

  cards.forEach((card) => {
    if (card.supertype === 'Pokémon') {
      pokemonCount++;
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
          };
  
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
    
              attackStat.costTypeStats.individual[cost]++;
              attackStatByCost.costTypeStats.individual[cost]++;
              attackStat.costTypeStats.total++;
              attackStatByCost.costTypeStats.total++;
            }
          });
  
          attackStat.moveCount++;
          attackStatByCost.moveCount++;
          attackStat.moveCost += attack.convertedEnergyCost;
          attackStatByCost.moveCost += attack.convertedEnergyCost;
  
          if (attack.text) {
            attackStat.moveEffectCount++;
            attackStatByCost.moveEffectCount++;
          }
  
          if (attack.damage) {
            attackStat.damageMoveCount++;
            attackStatByCost.damageMoveCount++;
  
            let attackDamage = attack.damage;
            const lastCharacter = attack.damage.charAt(attack.damage.length - 1);
  
            if (lastCharacter === '+') {
              attackStat.plusDamageCount++;
              attackStatByCost.plusDamageCount++;
              attackDamage = attackDamage.substr(0, attackDamage.length - 1);
            } else if (lastCharacter === '×') {
              attackStat.timesDamageCount++;
              attackStatByCost.timesDamageCount++;
              attackDamage = attackDamage.substr(0, attackDamage.length - 1);
            } else if (lastCharacter === '-') {
              attackStat.minusDamageCount++;
              attackStatByCost.minusDamageCount++;
              attackDamage = attackDamage.substr(0, attackDamage.length - 1);
            }
  
            attackStat.damage += +attackDamage;
            attackStatByCost.damage += +attackDamage;
          }
        });
      }
  
      if (card.abilities) {
        abilityCount++;
      }
  
      if (card.hp) {
        hp += +card.hp;
      }
    }
  });

  return {
    count: pokemonCount,
    hp,
    abilityCount,
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
