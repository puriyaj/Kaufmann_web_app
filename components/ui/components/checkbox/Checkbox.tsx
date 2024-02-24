import classNames from "classnames";
import React from "react";

interface props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  isMultiline?: boolean;
  inputStyle?: string;
  labelStyle?: string;
  error?: string | null;
  icon?: React.ReactNode;
  label?: React.ReactNode;
  labelClassName?: string;
  mb?: string;
}

// eslint-disable-next-line react/display-name
export const Checkbox = React.forwardRef<HTMLInputElement, props>(({ isMultiline, error, mb = "mb-0", required, icon, labelClassName, inputStyle, labelStyle, ...rest }, ref) => {
  return (
    <div className={classNames(mb, rest.className, "focus-within:text-blue-300 border-blue-500")}>
      <label className={classNames("w-full py-1 px-3 inline-flex justify-start items-center select-none dark:text-white hover:text-blue-500 cursor-pointer", labelStyle)}>
        {icon}
        <input type="checkbox" {...rest} ref={ref} className={classNames(`inline-block me-2 border-none text-sm`, error ? "border-red-600 dark:border-red-600" : "", inputStyle)} />
        <span className={classNames("text-xs whitespace-nowrap", error ? "text-border-red-600 dark:text-red-600" : "", labelClassName)}>{rest.label}</span>
      </label>
      {error && <small className="w-full text-red-500 text-sm pl-4">{error}</small>}
    </div>
  );
});
