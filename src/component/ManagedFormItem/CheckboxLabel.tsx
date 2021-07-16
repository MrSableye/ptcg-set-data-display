import React from 'react';
import { Checkbox, Tooltip } from 'antd';
import { Enableable } from './types';

interface CheckboxLabelProps {
  label: string;
  tooltip?: string;
  enableable?: Enableable
}

const InnerCheckboxLabel = ({ label, enableable }: CheckboxLabelProps) => (
  enableable
    ? (
      <Checkbox
        checked={enableable.enabled}
        onChange={(event) => enableable.setEnabled(event.target.checked)}
      >
        {label}
      </Checkbox>
    )
    : <span>{label}</span>);

const CheckboxLabel = ({ label, tooltip, enableable }: CheckboxLabelProps) => (
  tooltip
    ? (
      <Tooltip title={tooltip}>
        <InnerCheckboxLabel label={label} enableable={enableable} />
      </Tooltip>
    )
    : <InnerCheckboxLabel label={label} enableable={enableable} />
);

export default CheckboxLabel;
