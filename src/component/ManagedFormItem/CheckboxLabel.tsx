import React from 'react';
import { Checkbox, Tooltip } from 'antd';
import { Enableable } from './types';

interface CheckboxLabelProps {
  label: string;
  tooltip?: string;
  enableable?: Enableable
}

const InnerCheckboxLabel = ({ label, tooltip }: CheckboxLabelProps) => (
  tooltip
    ? (
      <Tooltip title={tooltip}>
        {label}
      </Tooltip>
    )
    : <span>{label}</span>
);

const CheckboxLabel = ({ label, tooltip, enableable }: CheckboxLabelProps) => (
  enableable
    ? (
      <Checkbox
        checked={enableable.enabled}
        onChange={(event) => enableable.setEnabled(event.target.checked)}
      >
        <InnerCheckboxLabel label={label} tooltip={tooltip} enableable={enableable} />
      </Checkbox>
    )
    : <InnerCheckboxLabel label={label} tooltip={tooltip} enableable={enableable} />);

export default CheckboxLabel;
