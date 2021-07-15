import { Select } from 'antd';
import { BaseFields, MultiSelectFields } from './types';

type MultiSelectProps = BaseFields & MultiSelectFields;

const MultiSelect = ({
  prompt,
  options,
  enableable,
  selectedOptions,
  setSelectedOptions,
}: MultiSelectProps) => <Select
  mode='multiple'
  disabled={enableable ? !enableable.enabled : false}
  allowClear
  value={selectedOptions}
  onChange={setSelectedOptions}
  placeholder={prompt || ''}
>
  {options.map((option) => (
    <Select.Option
      key={option.value}
      value={option.value}
    >
      {option.label || option.value}
    </Select.Option>
  ))}
</Select>;

export default MultiSelect;
