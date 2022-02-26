type Nullable<T> = T | null;

export interface Ability {
  name: string;
  text: string;
  type: string;
}

export interface Attack {
  name: string;
  cost?: Nullable<Nullable<string>>[];
  convertedEnergyCost: number;
  damage?: Nullable<string>;
  text?: Nullable<string>;
}

export interface WeaknessOrResistance {
  type: string;
  value: string;
}

export interface SetImages {
  symbol: string;
  logo: string;
}

export interface Set {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: Legalities;
  ptcgoCode?: Nullable<string>;
  releaseDate: string;
  updatedAt: string;
  images: SetImages;
}

export interface Legalities {
  unlimited?: Nullable<string>;
  expanded?: Nullable<string>;
  standard?: Nullable<string>;
}

export interface Images {
  small: string;
  large: string;
}

export interface TcgPlayerPrices {
  low?: Nullable<number>;
  mid?: Nullable<number>;
  high?: Nullable<number>;
  market?: Nullable<number>;
  directLow?: Nullable<number>;
}

export interface AncientTrait {
  name: string;
  text: string;
}

export interface Prices {
  holofoil?: Nullable<TcgPlayerPrices>;
  normal?: Nullable<TcgPlayerPrices>;
  '1stEditionHolofoil'?: Nullable<TcgPlayerPrices>;
  '1stEditionNormal'?: Nullable<TcgPlayerPrices>;
  reverseHolofoil?: Nullable<TcgPlayerPrices>;
}

export interface Tcgplayer {
  url: string;
  updatedAt: string;
  prices?: Prices;
}

export interface Card {
  id: string;
  name: string;
  supertype: string;
  subtypes?: Nullable<string[]>;
  level?: Nullable<string>;
  hp?: Nullable<string>;
  types?: Nullable<string[]>;
  evolvesFrom?: Nullable<string>;
  abilities?: Nullable<Ability[]>;
  attacks?: Nullable<Attack[]>;
  weaknesses?: Nullable<WeaknessOrResistance[]>;
  retreatCost?: Nullable<string[]>;
  convertedRetreatCost?: Nullable<number>;
  set: Set;
  number: string;
  artist?: Nullable<string>;
  rarity?: Nullable<string>;
  flavorText?: Nullable<string>;
  nationalPokedexNumbers?: Nullable<number[]>;
  legalities: Legalities;
  images: Images;
  tcgplayer?: Nullable<Tcgplayer>;
  resistances?: Nullable<WeaknessOrResistance[]>;
  evolvesTo?: Nullable<string[]>;
  rules?: Nullable<string[]>;
  ancientTrait?: Nullable<AncientTrait>;
}

export interface Cache {
  cards: Record<string, Record<string, Card>>;
  sets: Set[];
  types: string[]
  subtypes: string[];
  supertypes: string[];
  rarities: string[];
}
