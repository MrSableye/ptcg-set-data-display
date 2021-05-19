import { Form, Slider } from 'antd';
import CheckboxLabel from './CheckboxLabel';
import { Enableable } from './types';

interface RangeSelectProps {
  label: string;
  tooltip?: string;
  enableable?: Enableable;
  step: number;
  maxRange: { min: number, max: number };
  selectedRange: { min: number, max: number };
  setSelectedRange: (range: { min: number, max: number }) => void;
}

const RangeSelect = ({
  label,
  tooltip,
  enableable,
  step,
  maxRange,
  selectedRange,
  setSelectedRange,
}: RangeSelectProps) => <Form.Item label={<CheckboxLabel label={label} tooltip={tooltip} enableable={enableable} />}>
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
      setSelectedRange({ min, max })
    }}
  />
</Form.Item>;

export default RangeSelect;
