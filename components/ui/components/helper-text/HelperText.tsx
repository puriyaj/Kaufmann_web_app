import classNames from "classnames";
import type { ComponentProps, FC, PropsWithChildren } from "react";
import { UIColors } from "../../types";
import { theme } from "./helperText.theme";

export interface HelperColors extends Pick<UIColors, "gray" | "info" | "failure" | "warning" | "success"> {
  [key: string]: string;
}

export interface HelperTextProps extends PropsWithChildren<Omit<ComponentProps<"p">, "color">> {
  color?: keyof HelperColors;
  value?: string;
}

export const HelperText: FC<HelperTextProps> = ({ value, children, color = "default", className, ...props }) => {
  return (
    <p className={classNames(theme.base, theme.colors[color], className)} {...props}>
      {value ?? children ?? ""}
    </p>
  );
};

export default HelperText;
