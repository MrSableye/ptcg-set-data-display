import React from 'react';
import { Input } from 'antd';
import { BaseFields, TextInputFields } from './types';

type TextInputProps = BaseFields & TextInputFields;

const TextInput = ({
  prompt,
  enableable,
  text,
  setText,
}: TextInputProps) => (
  <Input
    type="text"
    disabled={enableable ? !enableable.enabled : false}
    value={text}
    onChange={(event) => setText(event.target.value)}
    placeholder={prompt}
  />
);

export default TextInput;
