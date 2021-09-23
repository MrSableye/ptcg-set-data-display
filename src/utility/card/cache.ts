import { flatten } from 'lodash';
import {
  getCardsInSet,
  getRarities,
  getSets,
  getSubtypes,
  getSupertypes,
  getTypes,
} from './api';
import {
  Card,
  Set,
} from './types';

export class Cache {
  readonly sets: Set[];

  readonly types: string[];

  readonly supertypes: string[];

  readonly subtypes: string[];

  readonly rarities: string[];

  private readonly cards: Record<string, Card[]>;

  constructor(
    sets: Set[],
    types: string[],
    supertypes: string[],
    subtypes: string[],
    rarities: string[],
  ) {
    this.sets = sets;
    this.types = types;
    this.supertypes = supertypes;
    this.subtypes = subtypes;
    this.rarities = rarities;
    this.cards = {};
  }

  private async getCardsInSet(setId: string): Promise<Card[]> {
    if (this.cards[setId]) {
      return this.cards[setId];
    }

    const cardsInSet = await getCardsInSet(setId);
    this.cards[setId] = cardsInSet;
    return cardsInSet;
  }

  async getCardsInSets(setIds: string[]): Promise<Card[]> {
    const self = this;
    const setCards = await Promise.all(setIds.map((setId) => self.getCardsInSet(setId)));
    return flatten(setCards);
  }
}

export const initializeCache = async (): Promise<Cache> => {
  const sets = await getSets();
  const types = await getTypes();
  const supertypes = await getSupertypes();
  const subtypes = await getSubtypes();
  const rarities = await getRarities();

  return new Cache(sets, types, supertypes, subtypes, rarities);
};
