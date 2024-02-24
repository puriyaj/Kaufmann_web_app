import { NOTFOUND_MESSAGE, SEARCH_MESSAGE } from "@utils/constants";
import { searchCategories } from "actions/category.action";
import moment, { loadPersian } from "moment-jalaali";
import React, { useCallback } from "react";
import { Control, Controller, RegisterOptions, useController } from "react-hook-form";
import ReactSelectAsync from "react-select/async";
import { useDebouncedCallback } from "use-debounce";
loadPersian({ dialect: "persian-modern" });

type ICategory = {
  id: string;
  name: string;
};

type Props = {
  name: string;
  control: Control<any, any>;
  rules?: Omit<RegisterOptions<any, any>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled">;
  placeHolder?: string;
  containerClassName?: string;
  isClearable?: boolean;
  onChange?: (v?: any) => void;
};
export const CategorySelector: React.FC<Props> = (props) => {
  const { name, control, rules, placeHolder = "Choose Category", containerClassName, onChange, isClearable = false } = props;

  const { field: idField } = useController({ control, name: `${name}Id` });
  const { field: nameField } = useController({ control, name: `${name}Name` });

  const options = useDebouncedCallback(
    useCallback((inputValue: string, callback: (options: ICategory[]) => void) => {
      new Promise(async (resolve) => {
        const res = await searchCategories(inputValue);
        callback(res ?? []);

        resolve([]);
      });
    }, []),
    500,
  );

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className={containerClassName}>
          <ReactSelectAsync<ICategory>
            getOptionValue={(e) => e.id}
            getOptionLabel={(e) => e.name}
            loadOptions={options}
            isClearable={isClearable}
            onChange={(v) => {
              if (onChange) onChange(v);
              field.onChange(v);
              idField.onChange(v?.id);
              nameField.onChange(v?.name);
            }}
            value={field.value}
            placeholder={placeHolder}
            noOptionsMessage={({ inputValue }) => (inputValue.length == 0 ? SEARCH_MESSAGE : NOTFOUND_MESSAGE)}
            classNames={{
              singleValue: () => `dark:!text-white print:!whitespace-pre-line`,
              control: () => `print:!border-0 dark:!bg-gray-700 dark:!text-white !rounded-lg dark:!border-gray-500 duration-400 !text-xs print:!text-xs ${fieldState.error ? "!border-red-600" : "!border-gray-200 hover:!border-gray-400 dark:hover:!border-gray-300"}`,
              menu: () => `dark:!bg-gray-700 dark:!text-white !rounded-lg !text-sm`,
              option: (props) => (props.isFocused ? `dark:!bg-gray-500` : ``),
              input: () => `dark:!text-white !text-sm`,
              placeholder: () => `${fieldState.error ? "!text-red-600" : ""}`,
            }}
          />
          {fieldState.error && <small className="text-red-500">{fieldState.error.message}</small>}
        </div>
      )}
    />
  );
};
