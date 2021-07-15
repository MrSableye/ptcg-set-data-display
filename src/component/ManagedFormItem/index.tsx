import { Form } from 'antd';
import BooleanInput from './BooleanInput';
import CheckboxLabel from './CheckboxLabel';
import MultiSelect from './MultiSelect';
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
    case 'booleanSelect': return <BooleanInput {...baseFields} {...inputFields} />;
    case 'multiSelect': return <MultiSelect {...baseFields} {...inputFields} />;
    case 'rangeSelect': return <RangeSelect {...baseFields} {...inputFields} />;
    case 'textSelect': return <TextInput {...baseFields} {...inputFields} />;
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
}: ManagedFormItemProps) => <Form.Item label={<CheckboxLabel label={label} tooltip={tooltip} enableable={enableable} />}>
  {inputs.map((inputFields) => <FormItem
    baseFields={{
      label,
      enableable,
      tooltip,
    }}
    inputFields={inputFields}
    />
  )}
</Form.Item>;

export { CheckboxLabel };

export type {
  BaseFields,
  Enableable,
  InputFields,
};
