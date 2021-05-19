import { Checkbox, Form } from 'antd';
import CheckboxLabel from './CheckboxLabel';
import { Enableable } from './types';

interface BooleanSelectProps {
  label: string;
  tooltip?: string;
  prompt: string;
  enableable?: Enableable;
  selected: boolean;
  setSelected: (selected: boolean) => void;
}

const BooleanInput = ({
  label,
  tooltip,
  prompt,
  enableable,
  selected,
  setSelected,
}: BooleanSelectProps) => <Form.Item label={<CheckboxLabel label={label} tooltip={tooltip} enableable={enableable} />}>
  <Checkbox
    disabled={enableable ? !enableable.enabled : false}
    checked={selected}
    onChange={(event) => setSelected(event.target.checked)}
  >
    {prompt}
  </Checkbox>
</Form.Item>;

export default BooleanInput;
