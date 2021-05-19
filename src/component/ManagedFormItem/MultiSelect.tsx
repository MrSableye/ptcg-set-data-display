import { Form, Select } from 'antd';
import CheckboxLabel from './CheckboxLabel';
import { Enableable } from './types';

interface OptionWithLabel {
  value: string;
  label?: string;
}

interface MultiSelectProps {
  label: string;
  tooltip?: string;
  placeholder?: string;
  enableable?: Enableable;
  options: OptionWithLabel[];
  selectedOptions: string[];
  setSelectedOptions: (options: string[]) => void;
}

const MultiSelect = ({
  label,
  tooltip,
  placeholder,
  options,
  enableable,
  selectedOptions,
  setSelectedOptions,
}: MultiSelectProps) => <Form.Item label={<CheckboxLabel label={label} tooltip={tooltip} enableable={enableable} />}>
  <Select
    mode='multiple'
    disabled={enableable ? !enableable.enabled : false}
    allowClear
    value={selectedOptions}
    onChange={setSelectedOptions}
    placeholder={placeholder || ''}
  >
    {options.map((option) => (
      <Select.Option
        key={option.value}
        value={option.value}
      >
        {option.label || option.value}
      </Select.Option>
    ))}
  </Select>
</Form.Item>;

export default MultiSelect;
