export interface Count {
  total: number;
  individual: Record<string, number>;
}

export interface OverallStats {
  cardCount: number;
  typeCounts: Count;
  subtypeCounts: Count;
  rarityCounts: Count;
}

export interface AttackStats {
  moveCount: number;
  moveCost: number;
  costTypeStats: Count;
  damageMoveCount: number;
  damage: number;
  timesDamageCount: number;
  plusDamageCount: number;
  minusDamageCount: number;
  moveEffectCount: number;
}

export interface PokemonStats {
  count: number;
  hp: number;
  abilityCount: number;
  retreatCount: number;
  attackStats: AttackStats[];
  attackStatsByCost: AttackStats[];
}