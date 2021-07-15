import { useState } from 'react';
import { Collapse, Form } from 'antd';
import { Cache, getCardsForSets } from 'utility/card';
import { Filter, filterCards, filterDuplicateCards } from 'utility/filter';
import CardFilter from 'component/CardFilter';
import CardList from 'component/CardList';
import CardStat from 'component/CardStat';
import { ManagedFormItem } from 'component/ManagedFormItem';
import Header from './Header';

interface AppProps {
  cache: Cache;
}

const App = ({ cache }: AppProps) => {
  const [setIds, setSetIds] = useState<string[]>([]);
  const [filterDuplicates, setFilterDuplicates] = useState(false);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [excludeFilters, setExcludeFilters] = useState<Filter[]>([]);

  let cards = filterCards(
    getCardsForSets(cache, setIds),
    filters,
    excludeFilters,
  );
  cards = filterDuplicates ? filterDuplicateCards(cards) : cards;

  return <div>
    <Header />
    <Collapse style={{ width: '100%' }} bordered={false} defaultActiveKey={['settings', 'filters']}>
      <Collapse.Panel
        key='settings'
        header='Settings'
      >
        <Form size='small'>
          <ManagedFormItem
            label='Sets'
            inputs={[{
              type: 'multiSelect',
              prompt: 'Sets to select from',
              options: cache.sets.map((set) => ({
                value: set.id,
                label: `${set.name} (${set.ptcgoCode || set.id})`,
              })),
              selectedOptions: setIds,
              setSelectedOptions: setSetIds,
            }]}
          />
          <ManagedFormItem
            label='Filter identical cards'
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
        key='filters'
        header='Filters'
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
        key='stats'
        header='Stats'
      >
        <CardStat cards={cards} />
      </Collapse.Panel>
      <Collapse.Panel
        key='cards'
        header='Cards'
      >
        <CardList rowSize={6} cards={cards} />
      </Collapse.Panel>
    </Collapse>
  </div>;
};

export default App;
