import React from 'react';
import { Slider } from 'antd';
import { BaseFields, RangeSelectFields } from './types';

type RangeSelectProps = BaseFields & RangeSelectFields;

const RangeSelect = ({
  enableable,
  step,
  maxRange,
  selectedRange,
  setSelectedRange,
}: RangeSelectProps) => (
  <Slider
    disabled={enableable ? !enableable.enabled : false}
    range
    marks={{
      [maxRange.min]: maxRange.min,
      [maxRange.max]: maxRange.max,
    }}
    step={step}
    min={maxRange.min}
    max={maxRange.max}
    value={[selectedRange.min, selectedRange.max]}
    onChange={([min, max]) => {
      setSelectedRange({ min, max });
    }}
  />
);

export default RangeSelect;
