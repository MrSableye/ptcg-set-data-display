import { Form, Input } from 'antd';
import CheckboxLabel from './CheckboxLabel';
import { Enableable } from './types';

interface TextInputProps {
  label: string;
  tooltip?: string;
  placeholder?: string;
  enableable?: Enableable;
  text: string;
  setText: (text: string) => void;
}

const TextInput = ({
  label,
  tooltip,
  placeholder,
  enableable,
  text,
  setText,
}: TextInputProps) => <Form.Item label={<CheckboxLabel label={label} tooltip={tooltip} enableable={enableable} />}>
  <Input
    type='text'
    disabled={enableable ? !enableable.enabled : false}
    value={text}
    onChange={(event) => setText(event.target.value)}
    placeholder={placeholder}
  />
</Form.Item>;

export default TextInput;
