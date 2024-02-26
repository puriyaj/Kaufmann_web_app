import { ACTIVATION_STATUS } from '../prisma/generated/client';
import { activation_status_details } from '@utils/constants';
import React from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import ReactSelect from 'react-select';

type SelectOption = {
  id: ACTIVATION_STATUS;
  faName: string;
};

type Props = {
  name: string;
  control: Control<any, any>;
  rules?: Omit<RegisterOptions<any, any>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
  placeHolder?: string;
  className?: string;
  disabled?: boolean;
  containerClassName?: string;
  onChange?: (val?: any) => void;
};
export const ActivationStatusSelector: React.FC<Props> = (props) => {
  const { name, control, rules, placeHolder = 'Status', disabled, containerClassName, onChange } = props;

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className={containerClassName}>
          <ReactSelect<SelectOption, false>
            getOptionValue={(e) => e.id as any}
            getOptionLabel={(e) => e.faName}
            options={Object.values(activation_status_details)}
            onChange={(val) => {
              field.onChange(val?.id);
              if (onChange) onChange(val);
            }}
            value={activation_status_details[field.value as ACTIVATION_STATUS]}
            placeholder={placeHolder}
            className="col-span-2"
            isSearchable={false}
            isDisabled={disabled}
            classNames={{
              singleValue: () => `dark:!text-white print:!whitespace-pre-line`,
              control: () =>
                `print:!border-0 dark:!bg-gray-700 dark:!text-white !rounded-lg dark:!border-gray-500 duration-400 !text-xs print:!text-xs ${fieldState.error ? '!border-red-600' : '!border-gray-200 hover:!border-gray-400 dark:hover:!border-gray-300'}`,
              menu: () => `dark:!bg-gray-700 dark:!text-white !rounded-lg !text-sm`,
              option: (props) => (props.isFocused ? `dark:!bg-gray-500` : ``),
              input: () => `dark:!text-white !text-sm`,
              placeholder: () => `${fieldState.error ? '!text-red-600' : ''}`,
            }}
          />
          {fieldState.error && <small className="w-full pl-4 text-xs text-red-500">{fieldState.error.message}</small>}
        </div>
      )}
    />
  );
};
