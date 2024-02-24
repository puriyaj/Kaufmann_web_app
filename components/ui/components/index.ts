export * from './button/Button';
export * from './spinner/Spinner';
export * from './navbar/Navbar';
export * from './helper-text/HelperText';
export * from './file-input/FileInput';
export * from './radio/Radio';
export * from './text-input/TextInput';
export * from './toggleSwitch/ToggleSwitch';
export * from './textarea/Textarea';
export * from './checkbox/Checkbox';
export * from './avatar/Avatar';
export * from './table/Table';
export * from './input-box/InputBox';
export * from './tab/Tabs';

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
