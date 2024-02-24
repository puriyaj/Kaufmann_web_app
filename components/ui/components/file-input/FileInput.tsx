import classNames from "classnames";
import { ComponentProps, forwardRef, ReactNode } from "react";
import HelperText from "../helper-text/HelperText";
import { TextInputColors, TextInputSizes } from "../text-input/TextInput";
import { theme } from "./fileInput.theme";

export type FileInputProps = Omit<ComponentProps<"input">, "type" | "ref" | "color"> & {
  sizing?: keyof TextInputSizes;
  helperText?: ReactNode;
  color?: keyof TextInputColors;
};

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(({ sizing = "md", helperText, color = "gray", className, ...props }, ref) => {
  return (
    <>
      <div className={classNames(theme.base, className)}>
        <div className={theme.field.base}>
          <input className={classNames(theme.field.input.base, theme.field.input.colors[color], theme.field.input.sizes[sizing])} {...props} type="file" ref={ref} />
        </div>
      </div>
      {helperText && <HelperText color={color}>{helperText}</HelperText>}
    </>
  );
});

FileInput.displayName = "FileInput";
