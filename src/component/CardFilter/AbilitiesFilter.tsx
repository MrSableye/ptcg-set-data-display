import { useState } from 'react';
import {
  Button,
  Card,
  Form,
  Modal,
} from 'antd';
import {
  AbilityFilter,
  AbilitiesFilter,
  EnableableFilter,
} from 'utility/filter';
import {
  CheckboxLabel,
  Enableable,
  TextInput,
} from 'component/ManagedFormItem';

interface AbilityFilterDisplayProps {
  abilityfilter: EnableableFilter<AbilityFilter>;
  setAbilityFilter: (abilityfilter: EnableableFilter<AbilityFilter>) => void;
  removeSelf: () => void;
}

const AbilityFilterDisplay = ({
  abilityfilter,
  setAbilityFilter,
  removeSelf,
}: AbilityFilterDisplayProps) => <Card
  title={<CheckboxLabel
    label='Enable filter'
    enableable={{
      enabled: abilityfilter.enabled,
      setEnabled: (enabled) => setAbilityFilter({
        ...abilityfilter,
        enabled,
      })
    }}
  />}
  extra={<Button
    type='primary'
    danger
    onClick={removeSelf}
  >
    Delete
  </Button>}
>
  <Form size='small' colon={false} labelAlign='left' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
    <TextInput
      label='Ability name'
      placeholder='Ability name to match'
      enableable={{
        enabled: abilityfilter.value.name.enabled,
        setEnabled: (enabled) => setAbilityFilter({
          ...abilityfilter,
          value: {
            ...abilityfilter.value,
            name: {
              ...abilityfilter.value.name,
              enabled,
            }
          },
        })
      }}
      text={abilityfilter.value.name.value}
      setText={(text) => setAbilityFilter({
        ...abilityfilter,
        value: {
          ...abilityfilter.value,
          name: {
            enabled: abilityfilter.value.name.enabled,
            value: text,
          }
        },
      })}
    />
    <TextInput
      label='Ability type'
      placeholder='Ability type to match'
      enableable={{
        enabled: abilityfilter.value.type.enabled,
        setEnabled: (enabled) => setAbilityFilter({
          ...abilityfilter,
          value: {
            ...abilityfilter.value,
            type: {
              ...abilityfilter.value.type,
              enabled,
            }
          },
        })
      }}
      text={abilityfilter.value.type.value}
      setText={(text) => setAbilityFilter({
        ...abilityfilter,
        value: {
          ...abilityfilter.value,
          type: {
            enabled: abilityfilter.value.type.enabled,
            value: text,
          }
        },
      })}
    />
    <TextInput
      label='Effect text'
      placeholder='Effect text to match'
      enableable={{
        enabled: abilityfilter.value.text.enabled,
        setEnabled: (enabled) => setAbilityFilter({
          ...abilityfilter,
          value: {
            ...abilityfilter.value,
            text: {
              ...abilityfilter.value.text,
              enabled,
            }
          },
        })
      }}
      text={abilityfilter.value.text.value}
      setText={(text) => setAbilityFilter({
        ...abilityfilter,
        value: {
          ...abilityfilter.value,
          text: {
            enabled: abilityfilter.value.text.enabled,
            value: text,
          }
        },
      })}
    />
  </Form>
</Card>;

const addNewAbilityFilter = (
  abilitiesFilter: AbilitiesFilter,
): AbilitiesFilter => {
  const filtersCopy = [...abilitiesFilter, {
    enabled: false,
    value: {
      name: { enabled: false, value: '' },
      type: { enabled: false, value: '' },
      text: { enabled: false, value: '' },
    },
  }];

  return filtersCopy;
};

const updateAbilityFilter = (
  abilitiesFilter: AbilitiesFilter,
  abilityFilter: EnableableFilter<AbilityFilter>,
  abilityFilterIndex: number,
) => {
  const filtersCopy = [...abilitiesFilter];
  filtersCopy[abilityFilterIndex] = abilityFilter;
  return filtersCopy;
};

const removeAbilityFilter = (
  abilitiesFilter: AbilitiesFilter,
  abilityFilterIndex: number,
) => {
  const filtersCopy = [...abilitiesFilter];
  filtersCopy.splice(abilityFilterIndex, 1);
  return filtersCopy;
};

interface AbilitiesFilterDisplayFormProps {
  abilitiesFilter: AbilitiesFilter,
  setAbilitiesFilter: (abilitiesFilter: AbilitiesFilter) => void;
}

const AbilitiesFilterDisplayForm = ({
  abilitiesFilter,
  setAbilitiesFilter,
}: AbilitiesFilterDisplayFormProps) => <Form size='small' colon={false} labelAlign='left' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
  {
    abilitiesFilter.map((abilityFilter, abilityFilterIndex) => <AbilityFilterDisplay
      abilityfilter={abilityFilter}
      setAbilityFilter={(abilityFilter: EnableableFilter<AbilityFilter>) => {
        setAbilitiesFilter(updateAbilityFilter(
          abilitiesFilter,
          abilityFilter,
          abilityFilterIndex,
        ));
      }}
      removeSelf={() => setAbilitiesFilter(removeAbilityFilter(abilitiesFilter, abilityFilterIndex))}
    />)
  }
  <Button
    type='primary'
    onClick={() => setAbilitiesFilter(addNewAbilityFilter(abilitiesFilter))}
  >
    Add Filter
  </Button>
</Form>;

interface AbilitiesFilterDisplayProps {
  enableable: Enableable;
  abilitiesFilter: AbilitiesFilter;
  setAbilitiesFilter: (abilitiesFilter: AbilitiesFilter) => void;
}

const AbilitiesFilterDisplay = ({
  enableable,
  abilitiesFilter,
  setAbilitiesFilter,
}: AbilitiesFilterDisplayProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return <Form.Item label={<CheckboxLabel label={'Abilities'} enableable={enableable} />}>
    <Button
      disabled={!enableable.enabled}
      onClick={() => setIsModalOpen(true)}
    >
      Open Ability Filters
    </Button>
    <Modal
      visible={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      onOk={() => setIsModalOpen(false)}
      closable={false}
      footer={<Button onClick={() => setIsModalOpen(false)}>Close</Button>}
    >
      <AbilitiesFilterDisplayForm
        abilitiesFilter={abilitiesFilter}
        setAbilitiesFilter={setAbilitiesFilter}
      />
    </Modal>
  </Form.Item>;
};

export default AbilitiesFilterDisplay;
