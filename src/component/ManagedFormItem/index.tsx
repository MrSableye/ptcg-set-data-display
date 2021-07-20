import React from 'react';
import { Form } from 'antd';
import BooleanInput from './BooleanInput';
import CheckboxLabel from './CheckboxLabel';
import MultiSelect from './MultiSelect';
import GroupedMultiSelect from './GroupedMultiSelect';
import RangeSelect from './RangeSelect';
import TextInput from './TextInput';
import { BaseFields, Enableable, InputFields } from './types';

interface FormItemProps {
  baseFields: BaseFields;
  inputFields: InputFields;
}

const FormItem = ({
  baseFields,
  inputFields,
}: FormItemProps) => {
  switch (inputFields.type) {
    case 'booleanSelect': return (
      <BooleanInput
        type="booleanSelect"
        label={baseFields.label}
        enableable={baseFields.enableable}
        prompt={inputFields.prompt}
        selected={inputFields.selected}
        setSelected={inputFields.setSelected}
      />
    );
    case 'multiSelect': return (
      <MultiSelect
        type="multiSelect"
        label={baseFields.label}
        enableable={baseFields.enableable}
        prompt={inputFields.prompt}
        options={inputFields.options}
        selectedOptions={inputFields.selectedOptions}
        setSelectedOptions={inputFields.setSelectedOptions}
      />
    );
    case 'groupedMultiSelect': return (
      <GroupedMultiSelect
        type="groupedMultiSelect"
        label={baseFields.label}
        enableable={baseFields.enableable}
        prompt={inputFields.prompt}
        groupedOptions={inputFields.groupedOptions}
        selectedOptions={inputFields.selectedOptions}
        setSelectedOptions={inputFields.setSelectedOptions}
      />
    );
    case 'rangeSelect': return (
      <RangeSelect
        type="rangeSelect"
        label={baseFields.label}
        enableable={baseFields.enableable}
        maxRange={inputFields.maxRange}
        step={inputFields.step}
        selectedRange={inputFields.selectedRange}
        setSelectedRange={inputFields.setSelectedRange}
      />
    );
    case 'textSelect': return (
      <TextInput
        type="textSelect"
        label={baseFields.label}
        enableable={baseFields.enableable}
        prompt={inputFields.prompt}
        text={inputFields.text}
        setText={inputFields.setText}
      />
    );
    default: return <div />;
  }
};

interface ManagedFormItemProps extends BaseFields {
  inputs: InputFields[];
}

export const ManagedFormItem = ({
  label,
  enableable,
  tooltip,
  inputs,
}: ManagedFormItemProps) => (
  <Form.Item label={<CheckboxLabel label={label} tooltip={tooltip} enableable={enableable} />}>
    {inputs.map((inputFields) => (
      <FormItem
        baseFields={{
          label,
          enableable,
          tooltip,
        }}
        inputFields={inputFields}
      />
    ))}
  </Form.Item>
);

export { CheckboxLabel };

export type {
  BaseFields,
  Enableable,
  InputFields,
};
