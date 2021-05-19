const fs = require('fs');
const path = require('path');
const Axios = require('axios');

const apiKey = process.env.API_KEY || '';

const buildCache = async (cacheFileOutputPath) => {
  const sets = [];
  const cards = {};
  let types = [];
  let subtypes = [];
  let supertypes = [];
  let rarities = [];

  let page = 1;
  let result = await Axios.get('https://api.pokemontcg.io/v2/cards', {
    params: {
      page,
      orderBy: "id",
    },
    headers: {
      'X-Api-Key': apiKey,
    },
  });

  while (result.data.data.length > 0) {
    console.log(`Received card page ${page}`);
    page++;
    result.data.data.forEach((card) => {
      if (!cards[card.set.id]) {
        cards[card.set.id] = {};
      }

      cards[card.set.id][card.id] = card;
    });
    result = await Axios.get('https://api.pokemontcg.io/v2/cards', {
      params: {
        page,
        orderBy: "id",
      },
      headers: {
        'X-Api-Key': apiKey,
      },
    });
  }

  page = 1;
  result = await Axios.get('https://api.pokemontcg.io/v2/sets', {
    params: {
      page,
      orderBy: "-releaseDate",
    },
    headers: {
      'X-Api-Key': apiKey,
    },
  });

  while (result.data.data.length > 0) {
    page++;
    result.data.data.forEach((set) => {
      sets.push(set);
    });
    result = await Axios.get('https://api.pokemontcg.io/v2/sets', {
      params: {
        page,
        orderBy: "-releaseDate",
      },
      headers: {
        'X-Api-Key': apiKey,
      },
    });
  }

  result = await Axios.get('https://api.pokemontcg.io/v2/types', {
      headers: {
        'X-Api-Key': apiKey,
      },
    });

  types = result.data.data;

  result = await Axios.get('https://api.pokemontcg.io/v2/subtypes', {
      headers: {
        'X-Api-Key': apiKey,
      },
    });

  subtypes = result.data.data;

  result = await Axios.get('https://api.pokemontcg.io/v2/supertypes', {
    headers: {
      'X-Api-Key': apiKey,
    },
  });

  supertypes = result.data.data;

  result = await Axios.get('https://api.pokemontcg.io/v2/rarities', {
    headers: {
      'X-Api-Key': apiKey,
    },
  });

  rarities = result.data.data;

  fs.writeFileSync(
    cacheFileOutputPath,
    JSON.stringify({
      cards,
      sets,
      types,
      subtypes,
      supertypes,
      rarities,
    }),
    'utf8',
  );
};

buildCache(path.join(__dirname, 'src/utility/card/cache.json'));
