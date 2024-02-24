"use client";
import classNames from "classnames";
import type { ComponentProps, FC, ReactNode } from "react";
import { forwardRef } from "react";
import { Size, UIColors } from "../../types";
import HelperText from "../helper-text/HelperText";
import { theme } from "./textInput.theme";

export interface TextInputColors extends Pick<UIColors, "gray" | "info" | "failure" | "warning" | "success"> {
  [key: string]: string;
}

export interface TextInputSizes extends Pick<Size, "sm" | "md" | "lg"> {
  [key: string]: string;
}

export interface TextInputProps extends Omit<ComponentProps<"input">, "ref" | "color"> {
  sizing?: keyof TextInputSizes;
  shadow?: boolean;
  helperText?: ReactNode;
  addon?: ReactNode;
  icon?: FC<ComponentProps<"svg">>;
  color?: keyof TextInputColors;
  inputClassName?: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({ sizing = "md", shadow, helperText, addon, icon: Icon, color = "gray", className, inputClassName, ...props }, ref) => {
  return (
    <>
      <div className={classNames(theme.base, className)}>
        {addon && <span className={theme.addon}>{addon}</span>}
        <div className={theme.field.base}>
          {Icon && (
            <div className={theme.field.icon.base}>
              <Icon className={theme.field.icon.svg} />
            </div>
          )}
          <input
            className={classNames(theme.field.input.base, theme.field.input.colors[color], theme.field.input.withIcon[Icon ? "on" : "off"], theme.field.input.withAddon[addon ? "on" : "off"], theme.field.input.withShadow[shadow ? "on" : "off"], theme.field.input.sizes[sizing], inputClassName)}
            {...props}
            ref={ref}
          />
        </div>
      </div>
      {helperText && <HelperText color={color}>{helperText}</HelperText>}
    </>
  );
});

TextInput.displayName = "TextInput";
