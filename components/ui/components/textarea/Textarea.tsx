import classNames from "classnames";
import type { ComponentProps, ReactNode } from "react";
import { forwardRef } from "react";
import { UIColors } from "../../types";
import HelperText from "../helper-text/HelperText";
import { theme } from "./textarea.theme";

export interface TextareaColors extends Pick<UIColors, "gray" | "info" | "failure" | "warning" | "success"> {
  [key: string]: string;
}

export interface TextareaProps extends Omit<ComponentProps<"textarea">, "color" | "ref"> {
  shadow?: boolean;
  helperText?: ReactNode;
  color?: keyof TextareaColors;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ shadow, helperText, color = "gray", className, ...props }, ref) => {
  return (
    <>
      <textarea ref={ref} className={classNames(theme.base, theme.colors[color], theme.withShadow[shadow ? "on" : "off"], className)} {...props} />
      {helperText && <HelperText color={color}>{helperText}</HelperText>}
    </>
  );
});

Textarea.displayName = "Textarea";
