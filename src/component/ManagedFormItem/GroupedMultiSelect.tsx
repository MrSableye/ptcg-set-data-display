import React, { useState } from 'react';
import {
  Checkbox,
  Select,
} from 'antd';
import {
  BaseFields,
  GroupedMultiSelectFields,
  OptionWithLabel,
} from './types';

type GroupedMultiSelectProps = BaseFields & GroupedMultiSelectFields;

const GroupedMultiSelect = ({
  prompt,
  groupedOptions,
  enableable,
  selectedOptions,
  setSelectedOptions,
}: GroupedMultiSelectProps) => {
  const [selectedGroups, setSelectedGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (
    options: OptionWithLabel[],
    isChecked: boolean,
  ) => {
    const rawOptions = options.map((option) => option.value);
    if (isChecked) {
      setSelectedOptions([
        ...selectedOptions.filter((previousOption) => !rawOptions.includes(previousOption)),
        ...rawOptions,
      ]);
    } else {
      setSelectedOptions([
        ...selectedOptions.filter((previousOption) => !rawOptions.includes(previousOption)),
      ]);
    }
  };

  return (
    <Select
      mode="multiple"
      disabled={enableable ? !enableable.enabled : false}
      allowClear
      value={selectedOptions}
      onChange={setSelectedOptions}
      placeholder={prompt || ''}
    >
      {Object.entries(groupedOptions).map(([groupName, options]) => (
        <Select.OptGroup
          label={(
            <Checkbox
              checked={selectedGroups[groupName] || false}
              onChange={(event) => {
                setSelectedGroups((previousSelectedGroups) => ({
                  ...previousSelectedGroups,
                  [groupName]: event.target.checked,
                }));
                toggleGroup(options, event.target.checked);
              }}
            >
              {groupName}
            </Checkbox>
          )}
        >
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
};

export default GroupedMultiSelect;
