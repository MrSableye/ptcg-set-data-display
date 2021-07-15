import { Checkbox } from 'antd';
import { BaseFields, BooleanSelectFields } from './types';

type BooleanSelectProps = BaseFields & BooleanSelectFields;

const BooleanInput = ({
  prompt,
  enableable,
  selected,
  setSelected,
}: BooleanSelectProps) => <Checkbox
  disabled={enableable ? !enableable.enabled : false}
  checked={selected}
  onChange={(event) => setSelected(event.target.checked)}
>
  {prompt}
</Checkbox>;

export default BooleanInput;
