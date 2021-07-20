import React, { useState } from 'react';
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
  ManagedFormItem,
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
}: AttackFilterDisplayProps) => (
  <Card
    title={(
      <CheckboxLabel
        label="Enable filter"
        enableable={{
          enabled: attackFilter.enabled,
          setEnabled: (enabled) => setAttackFilter({
            ...attackFilter,
            enabled,
          }),
        }}
      />
)}
    extra={(
      <Button
        type="primary"
        danger
        onClick={removeSelf}
      >
        Delete
      </Button>
)}
  >
    <Form size="small" colon={false} labelAlign="left" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
      <ManagedFormItem
        label="Attack name"
        tooltip="Searches for cards with an attack with the given name"
        enableable={{
          enabled: attackFilter.value.name.enabled,
          setEnabled: (enabled) => setAttackFilter({
            ...attackFilter,
            value: {
              ...attackFilter.value,
              name: {
                ...attackFilter.value.name,
                enabled,
              },
            },
          }),
        }}
        inputs={[{
          type: 'textSelect',
          prompt: 'Attack name to match',
          text: attackFilter.value.name.value,
          setText: (text) => setAttackFilter({
            ...attackFilter,
            value: {
              ...attackFilter.value,
              name: {
                enabled: attackFilter.value.name.enabled,
                value: text,
              },
            },
          }),
        }]}
      />
      <ManagedFormItem
        label="Effect text"
        tooltip="Searches for cards with an attack with the given effect"
        enableable={{
          enabled: attackFilter.value.text.enabled,
          setEnabled: (enabled) => setAttackFilter({
            ...attackFilter,
            value: {
              ...attackFilter.value,
              text: {
                ...attackFilter.value.text,
                enabled,
              },
            },
          }),
        }}
        inputs={[{
          type: 'textSelect',
          prompt: 'Effect text to match',
          text: attackFilter.value.text.value,
          setText: (text) => setAttackFilter({
            ...attackFilter,
            value: {
              ...attackFilter.value,
              text: {
                enabled: attackFilter.value.text.enabled,
                value: text,
              },
            },
          }),
        }]}
      />
      <ManagedFormItem
        label="Attack slot"
        tooltip="Searches for cards with an attack slot within the given range"
        enableable={{
          enabled: attackFilter.value.slot.enabled,
          setEnabled: (enabled) => setAttackFilter({
            ...attackFilter,
            value: {
              ...attackFilter.value,
              slot: {
                ...attackFilter.value.slot,
                enabled,
              },
            },
          }),
        }}
        inputs={[{
          type: 'rangeSelect',
          maxRange: { min: 0, max: 2 },
          step: 1,
          selectedRange: attackFilter.value.slot.value,
          setSelectedRange: (range) => setAttackFilter({
            ...attackFilter,
            value: {
              ...attackFilter.value,
              slot: {
                enabled: attackFilter.value.slot.enabled,
                value: range,
              },
            },
          }),
        }]}
      />
      <ManagedFormItem
        label="Cost"
        tooltip="Searches for cards with a cost within the given range"
        enableable={{
          enabled: attackFilter.value.cost.enabled,
          setEnabled: (enabled) => setAttackFilter({
            ...attackFilter,
            value: {
              ...attackFilter.value,
              cost: {
                ...attackFilter.value.cost,
                enabled,
              },
            },
          }),
        }}
        inputs={[{
          type: 'rangeSelect',
          maxRange: { min: 0, max: 6 },
          step: 1,
          selectedRange: attackFilter.value.cost.value,
          setSelectedRange: (range) => setAttackFilter({
            ...attackFilter,
            value: {
              ...attackFilter.value,
              cost: {
                enabled: attackFilter.value.cost.enabled,
                value: range,
              },
            },
          }),
        }]}
      />
      <ManagedFormItem
        label="Damage"
        tooltip="Searches for cards with damage within the given range"
        enableable={{
          enabled: attackFilter.value.damage.enabled,
          setEnabled: (enabled) => setAttackFilter({
            ...attackFilter,
            value: {
              ...attackFilter.value,
              damage: {
                ...attackFilter.value.damage,
                enabled,
              },
            },
          }),
        }}
        inputs={[{
          type: 'rangeSelect',
          maxRange: { min: 0, max: 500 },
          step: 10,
          selectedRange: attackFilter.value.damage.value,
          setSelectedRange: (range) => setAttackFilter({
            ...attackFilter,
            value: {
              ...attackFilter.value,
              damage: {
                enabled: attackFilter.value.damage.enabled,
                value: range,
              },
            },
          }),
        }]}
      />
    </Form>
  </Card>
);

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
}: AttacksFilterDisplayFormProps) => (
  <Form size="small" colon={false} labelAlign="left" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
    {
    attacksFilter.map((attackFilter, attackFilterIndex) => (
      <AttackFilterDisplay
        attackFilter={attackFilter}
        setAttackFilter={(enableablAattackFilter: EnableableFilter<AttackFilter>) => {
          setAttacksFilter(updateAttackFilter(
            attacksFilter,
            enableablAattackFilter,
            attackFilterIndex,
          ));
        }}
        removeSelf={() => setAttacksFilter(removeAttackFilter(attacksFilter, attackFilterIndex))}
      />
    ))
  }
    <Button
      type="primary"
      onClick={() => setAttacksFilter(addNewAttackFilter(attacksFilter))}
    >
      Add Filter
    </Button>
  </Form>
);

interface AttacksFilterDisplayProps {
  enableable: Enableable;
  tooltip?: string;
  attacksFilter: AttacksFilter;
  setAttacksFilter: (attacksFilter: AttacksFilter) => void;
}

const AttacksFilterDisplay = ({
  enableable,
  tooltip,
  attacksFilter,
  setAttacksFilter,
}: AttacksFilterDisplayProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Form.Item label={<CheckboxLabel label="Attacks" enableable={enableable} tooltip={tooltip} />}>
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
    </Form.Item>
  );
};

export default AttacksFilterDisplay;
