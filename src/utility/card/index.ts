import cache from './cache.json';
import {
  Ability,
  AncientTrait,
  Attack,
  Cache,
  Card,
  Images,
  Legalities,
  Prices,
  Set,
  SetImages,
  Tcgplayer,
  WeaknessOrResistance,
} from './types';

const cardCache = cache as Cache;
const getCardsForSets = (cache: Cache, setIds: string[]): Card[] => {
  return setIds.reduce((cards, setId) => {
    const setCards = Object.values(cache.cards[setId] || {});

    return [...cards, ...setCards];
  }, [] as Card[]);
};

export { cardCache, getCardsForSets };
export type {
  Ability,
  AncientTrait,
  Attack,
  Cache,
  Card,
  Images,
  Legalities,
  Prices,
  Set,
  SetImages,
  Tcgplayer,
  WeaknessOrResistance,
};
