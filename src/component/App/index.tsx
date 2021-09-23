import React, { useEffect, useState } from 'react';
import {
  Collapse, Divider, Form, Layout, Space,
} from 'antd';
import Icon, { GithubFilled, TwitterOutlined } from '@ant-design/icons';
import {
  Cache,
  getCardCache,
  getCardsForSets,
  groupSets,
} from 'utility/card';
import { Filter, filterCards, filterDuplicateCards } from 'utility/filter';
import CardFilter from 'component/CardFilter';
import CardList from 'component/CardList';
import CardStat from 'component/CardStat';
import { ManagedFormItem } from 'component/ManagedFormItem';
import Header from './Header';

const twitchLogo = () => (
  <svg width="1em" height="1em" viewBox="0 0 2400 2800" fill="currentColor">
    <g>
      <path d="M500,0L0,500v1800h600v500l500-500h400l900-900V0H500z M2200,1300l-400,400h-400l-350,350v-350H600V200h1600V1300z" />
      <rect x="1700" y="550" width="200" height="600" />
      <rect x="1150" y="550" width="200" height="600" />
    </g>
  </svg>
);

const IconText = ({ icon, text }: any) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const App = () => {
  const [cache, setCache] = useState<Cache>({
    cards: {},
    rarities: [],
    sets: [],
    subtypes: [],
    supertypes: [],
    types: [],
  });
  const [setIds, setSetIds] = useState<string[]>([]);
  const [filterDuplicates, setFilterDuplicates] = useState(false);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [excludeFilters, setExcludeFilters] = useState<Filter[]>([]);
  const [isGallery, setIsGallery] = useState(false);

  useEffect(() => {
    getCardCache().then((updatedCache) => setCache(updatedCache));
  }, []);

  let cards = filterCards(
    getCardsForSets(cache, setIds),
    filters,
    excludeFilters,
  );
  cards = filterDuplicates ? filterDuplicateCards(cards) : cards;

  const groupedSets = groupSets(cache.sets);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Layout.Content>
        <Collapse style={{ width: '100%' }} bordered={false} defaultActiveKey={['settings', 'filters']}>
          <Collapse.Panel
            key="settings"
            header="Settings"
          >
            <Form size="small">
              <ManagedFormItem
                label="Sets"
                tooltip="Search for cards within the given sets"
                inputs={[{
                  type: 'groupedMultiSelect',
                  prompt: 'Sets to select from',
                  groupedOptions: groupedSets.reduce((
                    displayGrouping,
                    series,
                  ) => ({
                    ...displayGrouping,
                    [series.name]: series.sets.map((set) => ({
                      value: set.id,
                      label: `${set.name} (${set.ptcgoCode || set.id})`,
                    })),
                  }), {}),
                  selectedOptions: setIds,
                  setSelectedOptions: setSetIds,
                }]}
              />
              <ManagedFormItem
                label="Filter identical cards"
                tooltip="Filter cards that are mechanically identical"
                inputs={[{
                  type: 'booleanSelect',
                  prompt: 'Filter identical cards',
                  selected: filterDuplicates,
                  setSelected: setFilterDuplicates,
                }]}
              />
            </Form>
          </Collapse.Panel>
          <Collapse.Panel
            key="filters"
            header="Filters"
          >
            <CardFilter
              supertypes={cache.supertypes}
              subtypes={cache.subtypes}
              types={cache.types}
              rarities={cache.rarities}
              setFilters={setFilters}
              setExcludeFilters={setExcludeFilters}
            />
          </Collapse.Panel>
          <Collapse.Panel
            key="stats"
            header="Stats"
          >
            <CardStat cards={cards} />
          </Collapse.Panel>
          <Collapse.Panel
            key="cards"
            header="Cards"
          >
            <ManagedFormItem
              label="Display card images"
              tooltip="Show card images instead of names"
              inputs={[{
                type: 'booleanSelect',
                prompt: 'Show full card images instead of names',
                selected: isGallery,
                setSelected: setIsGallery,
              }]}
            />
            <CardList isGallery={isGallery} rowSize={6} cards={cards} />
          </Collapse.Panel>
        </Collapse>
      </Layout.Content>
      <Layout.Footer style={{ textAlign: 'center' }}>
        <div>
          <span>Powered by the </span>
          <a href="https://pokemontcg.io/">Pokémon TCG API</a>
        </div>
        <div>
          <a href="https://twitter.com/MisterSableye">
            <IconText icon={TwitterOutlined} text="MisterSableye" />
          </a>
          <Divider type="vertical" />
          <a href="https://github.com/MrSableye">
            <IconText icon={GithubFilled} text="MrSableye" />
          </a>
          <Divider type="vertical" />
          <a href="https://twitch.tv/MisterSableye">
            <IconText
              icon={() => (
                <Icon
                  component={twitchLogo}
                />
              )}
              text="MisterSableye"
            />
          </a>
        </div>
      </Layout.Footer>
    </Layout>
  );
};

export default App;
