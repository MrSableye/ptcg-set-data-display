import React from 'react';
import { Select } from 'antd';
import { BaseFields, GroupedMultiSelectFields } from './types';

type GroupedMultiSelectProps = BaseFields & GroupedMultiSelectFields;

const GroupedMultiSelect = ({
  prompt,
  groupedOptions,
  enableable,
  selectedOptions,
  setSelectedOptions,
}: GroupedMultiSelectProps) => (
  <Select
    mode="multiple"
    disabled={enableable ? !enableable.enabled : false}
    allowClear
    value={selectedOptions}
    onChange={setSelectedOptions}
    placeholder={prompt || ''}
  >
    {Object.entries(groupedOptions).map(([groupName, options]) => (
      <Select.OptGroup label={groupName}>
        {options.map((option) => (
          <Select.Option
            key={option.value}
            value={option.value}
          >
            {option.label || option.value}
          </Select.Option>
        ))}
      </Select.OptGroup>
    ))}
  </Select>
);

export default GroupedMultiSelect;
