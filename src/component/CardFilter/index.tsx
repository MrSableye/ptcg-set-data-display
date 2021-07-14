import { useEffect, useState } from 'react';
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
import {
  BooleanInput,
  MultiSelect,
  RangeSelect,
  TextInput,
} from 'component/ManagedFormItem';
import AbilitiesFilterDisplay from './AbilitiesFilter';
import AttacksFilterDisplay from './AttacksFilter';
import { getFilters } from './helper';

const useStateWithEnable = function<T>(initiallyEnabled: boolean, initialState: T) {
  const enabledHook = useState(initiallyEnabled);
  const stateHook = useState(initialState);

  return [enabledHook, stateHook] as [
    [boolean, React.Dispatch<React.SetStateAction<boolean>>],
    [T, React.Dispatch<React.SetStateAction<T>>]
  ];
};

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

  // TODO: Handle union
  const [
    [subtypeFilterEnabled, setSubtypeFilterEnabled],
    [subtypeFilter, setSubtypeFilter],
  ] = useStateWithEnable<string[]>(false, []);

  const [
    [subtypeExcludeFilterEnabled, setSubtypeExcludeFilterEnabled],
    [subtypeExcludeFilter, setSubtypeExcludeFilter],
  ] = useStateWithEnable<string[]>(false, []);

  // TODO: Handle union
  const [
    [typeFilterEnabled, setTypeFilterEnabled],
    [typeFilter, setTypeFilter],
  ] = useStateWithEnable<string[]>(false, []);

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
      subtype: { enabled: subtypeExcludeFilterEnabled, value: subtypeExcludeFilter },
      type: { enabled: typeExcludeFilterEnabled, value: typeExcludeFilter },
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

  return <Form size='small' colon={false} labelAlign='left' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
    <Row gutter={16}>
      <Col span={12}>
        <TextInput
          label='Name'
          placeholder='Name to match'
          enableable={{ enabled: nameFilterEnabled, setEnabled: setNameFilterEnabled }}
          text={nameFilter}
          setText={setNameFilter}
        />
        <TextInput
          label='Name Exclusion'
          placeholder='Name to filter out'
          enableable={{ enabled: nameExcludeFilterEnabled, setEnabled: setNameExcludeFilterEnabled }}
          text={nameExcludeFilter}
          setText={setNameExcludeFilter}
        />
        <MultiSelect
          label='Supertype'
          placeholder='Supertypes to include'
          enableable={{ enabled: supertypeFilterEnabled, setEnabled: setSupertypeFilterEnabled }}
          options={supertypes.map((supertype) => ({ value: supertype }))}
          selectedOptions={supertypeFilter}
          setSelectedOptions={setSupertypeFilter}
        />
        <MultiSelect
          label='Subtype'
          placeholder='Subtypes to include'
          enableable={{ enabled: subtypeFilterEnabled, setEnabled: setSubtypeFilterEnabled }}
          options={subtypes.map((subtype) => ({ value: subtype }))}
          selectedOptions={subtypeFilter}
          setSelectedOptions={setSubtypeFilter}
        />
        <MultiSelect
          label='Subtype Exclusion'
          placeholder='Subtypes to exclude'
          enableable={{ enabled: subtypeExcludeFilterEnabled, setEnabled: setSubtypeExcludeFilterEnabled }}
          options={subtypes.map((subtype) => ({ value: subtype }))}
          selectedOptions={subtypeExcludeFilter}
          setSelectedOptions={setSubtypeExcludeFilter}
        />
        <MultiSelect
          label='Type'
          placeholder='Types to include'
          enableable={{ enabled: typeFilterEnabled, setEnabled: setTypeFilterEnabled }}
          options={types.map((type) => ({ value: type }))}
          selectedOptions={typeFilter}
          setSelectedOptions={setTypeFilter}
        />
        <MultiSelect
          label='Type Exclusion'
          placeholder='Types to exclude'
          enableable={{ enabled: typeExcludeFilterEnabled, setEnabled: setTypeExcludeFilterEnabled }}
          options={types.map((type) => ({ value: type }))}
          selectedOptions={typeExcludeFilter}
          setSelectedOptions={setTypeExcludeFilter}
        />
        <TextInput
          label='Level'
          placeholder='Level to match'
          enableable={{ enabled: levelFilterEnabled, setEnabled: setLevelFilterEnabled }}
          text={levelFilter}
          setText={setLevelFilter}
        />
        <RangeSelect
          label='HP'
          enableable={{ enabled: hpFilterEnabled, setEnabled: setHpFilterEnabled }}
          maxRange={{ min: 0, max: 350 }}
          step={10}
          selectedRange={hpFilter}
          setSelectedRange={setHpFilter}
        />
        <RangeSelect
          label='Retreat'
          enableable={{ enabled: retreatFilterEnabled, setEnabled: setRetreatFilterEnabled }}
          maxRange={{ min: 0, max: 5 }}
          step={1}
          selectedRange={retreatFilter}
          setSelectedRange={setRetreatFilter}
        />
      </Col>
      <Col span={12}>
        <BooleanInput
          label='Evolution'
          prompt='Is evolution Pokémon?'
          enableable={{ enabled: isEvolutionFilterEnabled, setEnabled: setIsEvolutionFilterEnabled }}
          selected={isEvolutionFilter}
          setSelected={setIsEvolutionFilter}
        />
        <BooleanInput
          label='Evolves'
          prompt='Can evolve?'
          enableable={{ enabled: evolvesFilterEnabled, setEnabled: setEvolvesFilterEnabled }}
          selected={evolvesFilter}
          setSelected={setEvolvesFilter}
        />
        <MultiSelect
          label='Weakness'
          placeholder='Weaknesses to include'
          enableable={{ enabled: weaknessFilterEnabled, setEnabled: setWeaknessFilterEnabled }}
          options={types.map((type) => ({ value: type }))}
          selectedOptions={weaknessFilter}
          setSelectedOptions={setWeaknessFilter}
        />
        <MultiSelect
          label='Weakness Exclusion'
          placeholder='Weaknesses to exclude'
          enableable={{ enabled: weaknessExcludeFilterEnabled, setEnabled: setWeaknessExcludeFilterEnabled }}
          options={types.map((type) => ({ value: type }))}
          selectedOptions={weaknessExcludeFilter}
          setSelectedOptions={setWeaknessExcludeFilter}
        />
        <MultiSelect
          label='Resistance'
          placeholder='Resistances to include'
          enableable={{ enabled: resistanceFilterEnabled, setEnabled: setResistanceFilterEnabled }}
          options={types.map((type) => ({ value: type }))}
          selectedOptions={resistanceFilter}
          setSelectedOptions={setResistanceFilter}
        />
        <MultiSelect
          label='Resistance Exclusion'
          placeholder='Resistances to exclude'
          enableable={{ enabled: resistanceExcludeFilterEnabled, setEnabled: setResistanceExcludeFilterEnabled }}
          options={types.map((type) => ({ value: type }))}
          selectedOptions={resistanceExcludeFilter}
          setSelectedOptions={setResistanceExcludeFilter}
        />
        <MultiSelect
          label='Rarity'
          placeholder='Rarities to include'
          enableable={{ enabled: rarityFilterEnabled, setEnabled: setRarityFilterEnabled }}
          options={rarities.map((type) => ({ value: type }))}
          selectedOptions={rarityFilter}
          setSelectedOptions={setRarityFilter}
        />
        <MultiSelect
          label='Rarity Exclusion'
          placeholder='Rarities to exclude'
          enableable={{ enabled: rarityExcludeFilterEnabled, setEnabled: setRarityFilterExcludeEnabled }}
          options={rarities.map((type) => ({ value: type }))}
          selectedOptions={rarityExcludeFilter}
          setSelectedOptions={setRarityExcludeFilter}
        />
        <TextInput
          label='Flavor Text'
          placeholder='Flavor text to match'
          enableable={{ enabled: flavorTextFilterEnabled, setEnabled: setFlavorTextFilterEnabled }}
          text={flavorTextFilter}
          setText={setFlavorTextFilter}
        />
        <TextInput
          label='Flavor Text Exclusion'
          placeholder='Flavor text to filter out'
          enableable={{ enabled: flavorTextExcludeFilterEnabled, setEnabled: setFlavorTextExcludeFilterEnabled }}
          text={flavorTextExcludeFilter}
          setText={setFlavorTextExcludeFilter}
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
  </Form>;
};

export default CardFilter;
