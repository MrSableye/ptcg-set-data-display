import { groupBy } from 'lodash';
import { Cache, initializeCache } from './cache';
import {
  Ability,
  AncientTrait,
  Attack,
  Card,
  Images,
  Legalities,
  Prices,
  Set,
  SetImages,
  Tcgplayer,
  WeaknessOrResistance,
} from './types';

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

export { initializeCache, groupSets };
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
