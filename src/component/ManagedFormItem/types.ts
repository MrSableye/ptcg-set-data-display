export interface Enableable {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
}

export interface BaseFields {
  label: string;
  tooltip?: string;
  enableable?: Enableable;
}

export interface BooleanSelectFields {
  type: 'booleanSelect';
  prompt: string;
  selected: boolean;
  setSelected: (selected: boolean) => void;
}

export interface OptionWithLabel {
  value: string;
  label?: string;
}

export interface MultiSelectFields {
  type: 'multiSelect';
  prompt: string;
  options: OptionWithLabel[];
  selectedOptions: string[];
  setSelectedOptions: (options: string[]) => void;
}

export interface RangeSelectFields {
  type: 'rangeSelect';
  step: number;
  maxRange: { min: number, max: number };
  selectedRange: { min: number, max: number };
  setSelectedRange: (range: { min: number, max: number }) => void;
}

export interface TextInputFields {
  type: 'textSelect';
  prompt: string;
  text: string;
  setText: (text: string) => void;
}

export type InputFields = BooleanSelectFields | MultiSelectFields | RangeSelectFields | TextInputFields;
