import { useState } from 'react';
import {
  Button,
  Card,
  Form,
  Modal,
} from 'antd';
import {
  AttackFilter,
  AttacksFilter,
  EnableableFilter,
} from 'utility/filter';
import {
  CheckboxLabel,
  Enableable,
  TextInput,
  RangeSelect,
} from 'component/ManagedFormItem';

interface AttackFilterDisplayProps {
  attackFilter: EnableableFilter<AttackFilter>;
  setAttackFilter: (attackFilter: EnableableFilter<AttackFilter>) => void;
  removeSelf: () => void;
}

const AttackFilterDisplay = ({
  attackFilter,
  setAttackFilter,
  removeSelf,
}: AttackFilterDisplayProps) => <Card
  title={<CheckboxLabel
    label='Enable filter'
    enableable={{
      enabled: attackFilter.enabled,
      setEnabled: (enabled) => setAttackFilter({
        ...attackFilter,
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
      label='Attack name'
      placeholder='Attack name to match'
      enableable={{
        enabled: attackFilter.value.name.enabled,
        setEnabled: (enabled) => setAttackFilter({
          ...attackFilter,
          value: {
            ...attackFilter.value,
            name: {
              ...attackFilter.value.name,
              enabled,
            }
          },
        })
      }}
      text={attackFilter.value.name.value}
      setText={(text) => setAttackFilter({
        ...attackFilter,
        value: {
          ...attackFilter.value,
          name: {
            enabled: attackFilter.value.name.enabled,
            value: text,
          }
        },
      })}
    />
    <TextInput
      label='Effect text'
      placeholder='Effect text to match'
      enableable={{
        enabled: attackFilter.value.text.enabled,
        setEnabled: (enabled) => setAttackFilter({
          ...attackFilter,
          value: {
            ...attackFilter.value,
            text: {
              ...attackFilter.value.text,
              enabled,
            }
          },
        })
      }}
      text={attackFilter.value.text.value}
      setText={(text) => setAttackFilter({
        ...attackFilter,
        value: {
          ...attackFilter.value,
          text: {
            enabled: attackFilter.value.text.enabled,
            value: text,
          }
        },
      })}
    />
    <RangeSelect
      label='Attack slot'
      maxRange={{ min: 0, max: 2 }}
      step={1}
      enableable={{
        enabled: attackFilter.value.slot.enabled,
        setEnabled: (enabled) => setAttackFilter({
          ...attackFilter,
          value: {
            ...attackFilter.value,
            slot: {
              ...attackFilter.value.slot,
              enabled,
            }
          },
        })
      }}
      selectedRange={attackFilter.value.slot.value}
      setSelectedRange={(range) => setAttackFilter({
        ...attackFilter,
        value: {
          ...attackFilter.value,
          slot: {
            enabled: attackFilter.value.slot.enabled,
            value: range,
          }
        },
      })}
    />
    <RangeSelect
      label='Cost'
      maxRange={{ min: 0, max: 6 }}
      step={1}
      enableable={{
        enabled: attackFilter.value.cost.enabled,
        setEnabled: (enabled) => setAttackFilter({
          ...attackFilter,
          value: {
            ...attackFilter.value,
            cost: {
              ...attackFilter.value.cost,
              enabled,
            }
          },
        })
      }}
      selectedRange={attackFilter.value.cost.value}
      setSelectedRange={(range) => setAttackFilter({
        ...attackFilter,
        value: {
          ...attackFilter.value,
          cost: {
            enabled: attackFilter.value.cost.enabled,
            value: range,
          }
        },
      })}
    />
    <RangeSelect
      label='Damage'
      maxRange={{ min: 0, max: 1000 }}
      step={10}
      enableable={{
        enabled: attackFilter.value.damage.enabled,
        setEnabled: (enabled) => setAttackFilter({
          ...attackFilter,
          value: {
            ...attackFilter.value,
            damage: {
              ...attackFilter.value.damage,
              enabled,
            }
          },
        })
      }}
      selectedRange={attackFilter.value.damage.value}
      setSelectedRange={(range) => setAttackFilter({
        ...attackFilter,
        value: {
          ...attackFilter.value,
          damage: {
            enabled: attackFilter.value.damage.enabled,
            value: range,
          }
        },
      })}
    />
  </Form>
</Card>;

const addNewAttackFilter = (
  attackFilters: AttacksFilter,
): AttacksFilter => {
  const filtersCopy = [...attackFilters, {
    enabled: false,
    value: {
      name: { enabled: false, value: '' },
      cost: { enabled: false, value: { min: 0, max: 6 } },
      damage: { enabled: false, value: { min: 0, max: 1000 } },
      slot: { enabled: false, value: { min: 0, max: 2 } },
      text: { enabled: false, value: '' },
    },
  }];

  return filtersCopy;
};

const updateAttackFilter = (
  attackFilters: AttacksFilter,
  attackFilter: EnableableFilter<AttackFilter>,
  attackFilterIndex: number,
) => {
  const filtersCopy = [...attackFilters];
  filtersCopy[attackFilterIndex] = attackFilter;
  return filtersCopy;
};

const removeAttackFilter = (
  attackFilters: AttacksFilter,
  attackFilterIndex: number,
) => {
  const filtersCopy = [...attackFilters];
  filtersCopy.splice(attackFilterIndex, 1);
  return filtersCopy;
};

interface AttacksFilterDisplayFormProps {
  attacksFilter: AttacksFilter;
  setAttacksFilter: (attacksFilter: AttacksFilter) => void;
}

const AttacksFilterDisplayForm = ({
  attacksFilter,
  setAttacksFilter,
}: AttacksFilterDisplayFormProps) => <Form size='small' colon={false} labelAlign='left' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
  {
    attacksFilter.map((attackFilter, attackFilterIndex) => <AttackFilterDisplay
      attackFilter={attackFilter}
      setAttackFilter={(attackFilter: EnableableFilter<AttackFilter>) => {
        setAttacksFilter(updateAttackFilter(
          attacksFilter,
          attackFilter,
          attackFilterIndex,
        ));
      }}
      removeSelf={() => setAttacksFilter(removeAttackFilter(attacksFilter, attackFilterIndex))}
    />)
  }
  <Button
    type='primary'
    onClick={() => setAttacksFilter(addNewAttackFilter(attacksFilter))}
  >
    Add Filter
  </Button>
</Form>;

interface AttacksFilterDisplayProps {
  enableable: Enableable;
  attacksFilter: AttacksFilter;
  setAttacksFilter: (attacksFilter: AttacksFilter) => void;
}

const AttacksFilterDisplay = ({
  enableable,
  attacksFilter,
  setAttacksFilter,
}: AttacksFilterDisplayProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return <Form.Item label={<CheckboxLabel label={'Attacks'} enableable={enableable} />}>
    <Button
      disabled={!enableable.enabled}
      onClick={() => setIsModalOpen(true)}
    >
      Open Attack Filters
    </Button>
    <Modal
      visible={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      onOk={() => setIsModalOpen(false)}
      closable={false}
      footer={<Button onClick={() => setIsModalOpen(false)}>Close</Button>}
    >
      <AttacksFilterDisplayForm
        attacksFilter={attacksFilter}
        setAttacksFilter={setAttacksFilter}
      />
    </Modal>
  </Form.Item>;
};

export default AttacksFilterDisplay;
