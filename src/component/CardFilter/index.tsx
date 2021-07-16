import React, { useEffect, useState } from 'react';
import {
  Col,
  Form,
  Row,
} from 'antd';
import {
  AbilitiesFilter,
  AttacksFilter,
  Filter,
} from 'utility/filter';
import { ManagedFormItem } from 'component/ManagedFormItem';
import AbilitiesFilterDisplay from './AbilitiesFilter';
import AttacksFilterDisplay from './AttacksFilter';
import { getFilters } from './helper';

function useStateWithEnable<T>(initiallyEnabled: boolean, initialState: T) {
  const enabledHook = useState(initiallyEnabled);
  const stateHook = useState(initialState);

  return [enabledHook, stateHook] as [
    [boolean, React.Dispatch<React.SetStateAction<boolean>>],
    [T, React.Dispatch<React.SetStateAction<T>>],
  ];
}

interface CardFilterProps {
  supertypes: string[];
  subtypes: string[];
  types: string[];
  rarities: string[];
  setFilters: (filters: Filter[]) => void;
  setExcludeFilters: (filters: Filter[]) => void;
}

const CardFilter = ({
  supertypes,
  subtypes,
  types,
  rarities,
  setFilters,
  setExcludeFilters,
}: CardFilterProps) => {
  const [
    [nameFilterEnabled, setNameFilterEnabled],
    [nameFilter, setNameFilter],
  ] = useStateWithEnable(false, '');

  const [
    [nameExcludeFilterEnabled, setNameExcludeFilterEnabled],
    [nameExcludeFilter, setNameExcludeFilter],
  ] = useStateWithEnable(false, '');

  const [
    [supertypeFilterEnabled, setSupertypeFilterEnabled],
    [supertypeFilter, setSupertypeFilter],
  ] = useStateWithEnable<string[]>(false, []);

  const [
    [subtypeFilterEnabled, setSubtypeFilterEnabled],
    [subtypeFilter, setSubtypeFilter],
  ] = useStateWithEnable<{ isUnion: boolean, subtypes: string[] }>(
    false,
    { isUnion: true, subtypes: [] },
  );

  const [
    [subtypeExcludeFilterEnabled, setSubtypeExcludeFilterEnabled],
    [subtypeExcludeFilter, setSubtypeExcludeFilter],
  ] = useStateWithEnable<string[]>(false, []);

  const [
    [typeFilterEnabled, setTypeFilterEnabled],
    [typeFilter, setTypeFilter],
  ] = useStateWithEnable<{ isUnion: boolean, types: string[] }>(
    false,
    { isUnion: true, types: [] },
  );

  const [
    [typeExcludeFilterEnabled, setTypeExcludeFilterEnabled],
    [typeExcludeFilter, setTypeExcludeFilter],
  ] = useStateWithEnable<string[]>(false, []);

  const [
    [levelFilterEnabled, setLevelFilterEnabled],
    [levelFilter, setLevelFilter],
  ] = useStateWithEnable(false, '');

  const [
    [hpFilterEnabled, setHpFilterEnabled],
    [hpFilter, setHpFilter],
  ] = useStateWithEnable(false, { min: 0, max: 350 });

  const [
    [isEvolutionFilterEnabled, setIsEvolutionFilterEnabled],
    [isEvolutionFilter, setIsEvolutionFilter],
  ] = useStateWithEnable(false, false);

  const [
    [evolvesFilterEnabled, setEvolvesFilterEnabled],
    [evolvesFilter, setEvolvesFilter],
  ] = useStateWithEnable(false, false);

  const [
    [weaknessFilterEnabled, setWeaknessFilterEnabled],
    [weaknessFilter, setWeaknessFilter],
  ] = useStateWithEnable<string[]>(false, []);

  const [
    [weaknessExcludeFilterEnabled, setWeaknessExcludeFilterEnabled],
    [weaknessExcludeFilter, setWeaknessExcludeFilter],
  ] = useStateWithEnable<string[]>(false, []);

  const [
    [resistanceFilterEnabled, setResistanceFilterEnabled],
    [resistanceFilter, setResistanceFilter],
  ] = useStateWithEnable<string[]>(false, []);

  const [
    [resistanceExcludeFilterEnabled, setResistanceExcludeFilterEnabled],
    [resistanceExcludeFilter, setResistanceExcludeFilter],
  ] = useStateWithEnable<string[]>(false, []);

  const [
    [retreatFilterEnabled, setRetreatFilterEnabled],
    [retreatFilter, setRetreatFilter],
  ] = useStateWithEnable(false, { min: 0, max: 5 });

  const [
    [rarityFilterEnabled, setRarityFilterEnabled],
    [rarityFilter, setRarityFilter],
  ] = useStateWithEnable<string[]>(false, []);

  const [
    [rarityExcludeFilterEnabled, setRarityFilterExcludeEnabled],
    [rarityExcludeFilter, setRarityExcludeFilter],
  ] = useStateWithEnable<string[]>(false, []);

  const [
    [flavorTextFilterEnabled, setFlavorTextFilterEnabled],
    [flavorTextFilter, setFlavorTextFilter],
  ] = useStateWithEnable(false, '');

  const [
    [flavorTextExcludeFilterEnabled, setFlavorTextExcludeFilterEnabled],
    [flavorTextExcludeFilter, setFlavorTextExcludeFilter],
  ] = useStateWithEnable(false, '');

  const [
    [attacksFilterEnabled, setAttacksFilterEnabled],
    [attacksFilter, setAttacksFilter],
  ] = useStateWithEnable<AttacksFilter>(false, [{
    enabled: false,
    value: {
      name: { enabled: false, value: '' },
      cost: { enabled: false, value: { min: 0, max: 6 } },
      damage: { enabled: false, value: { min: 0, max: 1000 } },
      slot: { enabled: false, value: { min: 0, max: 2 } },
      text: { enabled: false, value: '' },
    },
  }]);

  const [
    [abilitiesFilterEnabled, setAbilitiesFilterEnabled],
    [abilitiesFilter, setAbilitiesFilter],
  ] = useStateWithEnable<AbilitiesFilter>(false, [{
    enabled: false,
    value: {
      name: { enabled: false, value: '' },
      type: { enabled: false, value: '' },
      text: { enabled: false, value: '' },
    },
  }]);

  useEffect(() => {
    setFilters(getFilters({
      name: { enabled: nameFilterEnabled, value: nameFilter },
      supertype: { enabled: supertypeFilterEnabled, value: supertypeFilter },
      subtype: { enabled: subtypeFilterEnabled, value: subtypeFilter },
      type: { enabled: typeFilterEnabled, value: typeFilter },
      level: { enabled: levelFilterEnabled, value: levelFilter },
      hp: { enabled: hpFilterEnabled, value: hpFilter },
      isEvolution: { enabled: isEvolutionFilterEnabled, value: isEvolutionFilter },
      evolves: { enabled: evolvesFilterEnabled, value: evolvesFilter },
      weakness: { enabled: weaknessFilterEnabled, value: weaknessFilter },
      resistance: { enabled: resistanceFilterEnabled, value: resistanceFilter },
      retreat: { enabled: retreatFilterEnabled, value: retreatFilter },
      rarity: { enabled: rarityFilterEnabled, value: rarityFilter },
      flavorText: { enabled: flavorTextFilterEnabled, value: flavorTextFilter },
      attacks: { enabled: attacksFilterEnabled, value: attacksFilter },
      abilities: { enabled: abilitiesFilterEnabled, value: abilitiesFilter },
    }));

    setExcludeFilters(getFilters({
      name: { enabled: nameExcludeFilterEnabled, value: nameExcludeFilter },
      subtype: {
        enabled: subtypeExcludeFilterEnabled,
        value: { isUnion: true, subtypes: subtypeExcludeFilter },
      },
      type: {
        enabled: typeExcludeFilterEnabled,
        value: { isUnion: true, types: typeExcludeFilter },
      },
      weakness: { enabled: weaknessExcludeFilterEnabled, value: weaknessExcludeFilter },
      resistance: { enabled: resistanceExcludeFilterEnabled, value: resistanceExcludeFilter },
      rarity: { enabled: rarityExcludeFilterEnabled, value: rarityExcludeFilter },
      flavorText: { enabled: flavorTextExcludeFilterEnabled, value: flavorTextExcludeFilter },
    }));
  }, [
    setFilters,
    setExcludeFilters,
    nameFilterEnabled, nameFilter,
    nameExcludeFilterEnabled, nameExcludeFilter,
    supertypeFilterEnabled, supertypeFilter,
    subtypeFilterEnabled, subtypeFilter,
    subtypeExcludeFilterEnabled, subtypeExcludeFilter,
    typeFilterEnabled, typeFilter,
    typeExcludeFilterEnabled, typeExcludeFilter,
    levelFilterEnabled, levelFilter,
    hpFilterEnabled, hpFilter,
    isEvolutionFilterEnabled, isEvolutionFilter,
    evolvesFilterEnabled, evolvesFilter,
    weaknessFilterEnabled, weaknessFilter,
    weaknessExcludeFilterEnabled, weaknessExcludeFilter,
    resistanceFilterEnabled, resistanceFilter,
    resistanceExcludeFilterEnabled, resistanceExcludeFilter,
    retreatFilterEnabled, retreatFilter,
    rarityFilterEnabled, rarityFilter,
    rarityExcludeFilterEnabled, rarityExcludeFilter,
    flavorTextFilterEnabled, flavorTextFilter,
    flavorTextExcludeFilterEnabled, flavorTextExcludeFilter,
    attacksFilterEnabled, attacksFilter,
    abilitiesFilterEnabled, abilitiesFilter,
  ]);

  return (
    <Form size="small" colon={false} labelAlign="left" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
      <Row gutter={16}>
        <Col span={12}>
          <ManagedFormItem
            label="Name"
            enableable={{ enabled: nameFilterEnabled, setEnabled: setNameFilterEnabled }}
            inputs={[{
              type: 'textSelect',
              prompt: 'Name to match',
              text: nameFilter,
              setText: setNameFilter,
            }]}
          />
          <ManagedFormItem
            label="Name Exclusion"
            enableable={{
              enabled: nameExcludeFilterEnabled,
              setEnabled: setNameExcludeFilterEnabled,
            }}
            inputs={[{
              type: 'textSelect',
              prompt: 'Name to filter out',
              text: nameExcludeFilter,
              setText: setNameExcludeFilter,
            }]}
          />
          <ManagedFormItem
            label="Supertype"
            enableable={{ enabled: supertypeFilterEnabled, setEnabled: setSupertypeFilterEnabled }}
            inputs={[{
              type: 'multiSelect',
              prompt: 'Supertypes to include',
              options: supertypes.map((supertype) => ({ value: supertype })),
              selectedOptions: supertypeFilter,
              setSelectedOptions: setSupertypeFilter,
            }]}
          />
          <ManagedFormItem
            label="Subtype"
            enableable={{ enabled: subtypeFilterEnabled, setEnabled: setSubtypeFilterEnabled }}
            inputs={[{
              type: 'multiSelect',
              prompt: 'Subtypes to include',
              options: subtypes.map((subtype) => ({ value: subtype })),
              selectedOptions: subtypeFilter.subtypes,
              setSelectedOptions: (options) => setSubtypeFilter({
                ...subtypeFilter,
                subtypes: options,
              }),
            }, {
              type: 'booleanSelect',
              prompt: 'Match all subtypes?',
              selected: !subtypeFilter.isUnion,
              setSelected: (selected) => setSubtypeFilter({
                ...subtypeFilter,
                isUnion: !selected,
              }),
            }]}
          />
          <ManagedFormItem
            label="Subtype Exclusion"
            enableable={{
              enabled: subtypeExcludeFilterEnabled,
              setEnabled: setSubtypeExcludeFilterEnabled,
            }}
            inputs={[{
              type: 'multiSelect',
              prompt: 'Subtypes to exclude',
              options: subtypes.map((subtype) => ({ value: subtype })),
              selectedOptions: subtypeExcludeFilter,
              setSelectedOptions: setSubtypeExcludeFilter,
            }]}
          />
          <ManagedFormItem
            label="Type"
            enableable={{ enabled: typeFilterEnabled, setEnabled: setTypeFilterEnabled }}
            inputs={[{
              type: 'multiSelect',
              prompt: 'Types to include',
              options: types.map((type) => ({ value: type })),
              selectedOptions: typeFilter.types,
              setSelectedOptions: (options) => setTypeFilter({
                ...typeFilter,
                types: options,
              }),
            }, {
              type: 'booleanSelect',
              prompt: 'Match all types?',
              selected: !typeFilter.isUnion,
              setSelected: (selected) => setTypeFilter({
                ...typeFilter,
                isUnion: !selected,
              }),
            }]}
          />
          <ManagedFormItem
            label="Type Exclusion"
            enableable={{
              enabled: typeExcludeFilterEnabled,
              setEnabled: setTypeExcludeFilterEnabled,
            }}
            inputs={[{
              type: 'multiSelect',
              prompt: 'Types to exclude',
              options: types.map((type) => ({ value: type })),
              selectedOptions: typeExcludeFilter,
              setSelectedOptions: setTypeExcludeFilter,
            }]}
          />
          <ManagedFormItem
            label="Level"
            enableable={{ enabled: levelFilterEnabled, setEnabled: setLevelFilterEnabled }}
            inputs={[{
              type: 'textSelect',
              prompt: 'Level to match',
              text: levelFilter,
              setText: setLevelFilter,
            }]}
          />
          <ManagedFormItem
            label="HP"
            enableable={{ enabled: hpFilterEnabled, setEnabled: setHpFilterEnabled }}
            inputs={[{
              type: 'rangeSelect',
              maxRange: { min: 0, max: 350 },
              step: 10,
              selectedRange: hpFilter,
              setSelectedRange: setHpFilter,
            }]}
          />
          <ManagedFormItem
            label="Retreat"
            enableable={{ enabled: retreatFilterEnabled, setEnabled: setRetreatFilterEnabled }}
            inputs={[{
              type: 'rangeSelect',
              maxRange: { min: 0, max: 5 },
              step: 1,
              selectedRange: retreatFilter,
              setSelectedRange: setRetreatFilter,
            }]}
          />
        </Col>
        <Col span={12}>
          <ManagedFormItem
            label="Evolution"
            enableable={{
              enabled: isEvolutionFilterEnabled,
              setEnabled: setIsEvolutionFilterEnabled,
            }}
            inputs={[{
              type: 'booleanSelect',
              prompt: 'Is evolution Pokémon?',
              selected: isEvolutionFilter,
              setSelected: setIsEvolutionFilter,
            }]}
          />
          <ManagedFormItem
            label="Evolves"
            enableable={{ enabled: evolvesFilterEnabled, setEnabled: setEvolvesFilterEnabled }}
            inputs={[{
              type: 'booleanSelect',
              prompt: 'Can evolve?',
              selected: evolvesFilter,
              setSelected: setEvolvesFilter,
            }]}
          />
          <ManagedFormItem
            label="Weakness"
            enableable={{ enabled: weaknessFilterEnabled, setEnabled: setWeaknessFilterEnabled }}
            inputs={[{
              type: 'multiSelect',
              prompt: 'Weaknesses to include',
              options: types.map((type) => ({ value: type })),
              selectedOptions: weaknessFilter,
              setSelectedOptions: setWeaknessFilter,
            }]}
          />
          <ManagedFormItem
            label="Weakness Exclusion"
            enableable={{
              enabled: weaknessExcludeFilterEnabled,
              setEnabled: setWeaknessExcludeFilterEnabled,
            }}
            inputs={[{
              type: 'multiSelect',
              prompt: 'Weaknesses to exclude',
              options: types.map((type) => ({ value: type })),
              selectedOptions: weaknessExcludeFilter,
              setSelectedOptions: setWeaknessExcludeFilter,
            }]}
          />
          <ManagedFormItem
            label="Resistance"
            enableable={{
              enabled: resistanceFilterEnabled,
              setEnabled: setResistanceFilterEnabled,
            }}
            inputs={[{
              type: 'multiSelect',
              prompt: 'Resistances to include',
              options: types.map((type) => ({ value: type })),
              selectedOptions: resistanceFilter,
              setSelectedOptions: setResistanceFilter,
            }]}
          />
          <ManagedFormItem
            label="Resistance Exclusion"
            enableable={{
              enabled: resistanceExcludeFilterEnabled,
              setEnabled: setResistanceExcludeFilterEnabled,
            }}
            inputs={[{
              type: 'multiSelect',
              prompt: 'Resistances to exclude',
              options: types.map((type) => ({ value: type })),
              selectedOptions: resistanceExcludeFilter,
              setSelectedOptions: setResistanceExcludeFilter,
            }]}
          />
          <ManagedFormItem
            label="Rarity"
            enableable={{ enabled: rarityFilterEnabled, setEnabled: setRarityFilterEnabled }}
            inputs={[{
              type: 'multiSelect',
              prompt: 'Rarities to include',
              options: rarities.map((rarity) => ({ value: rarity })),
              selectedOptions: rarityFilter,
              setSelectedOptions: setRarityFilter,
            }]}
          />
          <ManagedFormItem
            label="Rarity Exclusion"
            enableable={{
              enabled: rarityExcludeFilterEnabled,
              setEnabled: setRarityFilterExcludeEnabled,
            }}
            inputs={[{
              type: 'multiSelect',
              prompt: 'Rarities to exclude',
              options: rarities.map((rarity) => ({ value: rarity })),
              selectedOptions: rarityExcludeFilter,
              setSelectedOptions: setRarityExcludeFilter,
            }]}
          />
          <ManagedFormItem
            label="Flavor Text"
            enableable={{
              enabled: flavorTextFilterEnabled,
              setEnabled: setFlavorTextFilterEnabled,
            }}
            inputs={[{
              type: 'textSelect',
              prompt: 'Flavor text to match',
              text: flavorTextFilter,
              setText: setFlavorTextFilter,
            }]}
          />
          <ManagedFormItem
            label="Flavor Text Exclusion"
            enableable={{
              enabled: flavorTextExcludeFilterEnabled,
              setEnabled: setFlavorTextExcludeFilterEnabled,
            }}
            inputs={[{
              type: 'textSelect',
              prompt: 'Flavor text to filter out',
              text: flavorTextExcludeFilter,
              setText: setFlavorTextExcludeFilter,
            }]}
          />
          <AttacksFilterDisplay
            enableable={{ enabled: attacksFilterEnabled, setEnabled: setAttacksFilterEnabled }}
            attacksFilter={attacksFilter}
            setAttacksFilter={setAttacksFilter}
          />
          <AbilitiesFilterDisplay
            enableable={{ enabled: abilitiesFilterEnabled, setEnabled: setAbilitiesFilterEnabled }}
            abilitiesFilter={abilitiesFilter}
            setAbilitiesFilter={setAbilitiesFilter}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default CardFilter;
