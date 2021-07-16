import cardCache from './cache.json';
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

const typedCardCache = cardCache as Cache;

const getCardsForSets = (
  cache: Cache,
  setIds: string[],
): Card[] => setIds.reduce((cards, setId) => {
  const setCards = Object.values(cache.cards[setId] || {});

  return [...cards, ...setCards];
}, [] as Card[]);

export { typedCardCache as cardCache, getCardsForSets };
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
