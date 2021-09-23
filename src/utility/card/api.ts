import Axios from 'axios';
import { Card, Set } from './types';

const getPaginatedData = async <T>(url: string, params: Record<string, string>) => {
  const resultData: T[] = [];

  let page = 1;
  let data: { data: T[] } = { data: [] };

  do {
    // eslint-disable-next-line no-await-in-loop
    ({ data } = await Axios.get<{ data: T[] }>(url, {
      params: {
        page,
        ...params,
      },
    }));
    page += 1;
    resultData.push(...data.data);
  } while (data.data.length > 0);

  return resultData;
};

const getData = async <T>(url: string, params: Record<string, string>) => {
  const { data } = await Axios.get<{ data: T[] }>(url, {
    params: {
      ...params,
    },
  });

  return data.data;
};

export const getSets = () => getPaginatedData<Set>('https://api.pokemontcg.io/v2/sets', { orderBy: '-releaseDate' });
export const getTypes = () => getData<string>('https://api.pokemontcg.io/v2/types', {});
export const getSubtypes = () => getData<string>('https://api.pokemontcg.io/v2/subtypes', {});
export const getSupertypes = () => getData<string>('https://api.pokemontcg.io/v2/supertypes', {});
export const getRarities = () => getData<string>('https://api.pokemontcg.io/v2/rarities', {});
export const getCardsInSet = (setId: string) => getPaginatedData<Card>('https://api.pokemontcg.io/v2/cards', { q: `set.id:${setId}` });
