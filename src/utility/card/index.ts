import { groupBy } from 'lodash';
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

const groupSets = (sets: Set[]) => {
  const groupedSets = groupBy(sets, (set) => set.series);

  return Object.entries(groupedSets)
    .map(([seriesName, seriesSets]) => ({
      name: seriesName,
      sets: seriesSets,
      releaseDate: [...seriesSets].sort((
        setA,
        setB,
      ) => setA.releaseDate.localeCompare(setB.releaseDate))[0].releaseDate,
    }))
    .sort((seriesA, seriesB) => seriesB.releaseDate.localeCompare(seriesA.releaseDate));
};

export { typedCardCache as cardCache, getCardsForSets, groupSets };
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
