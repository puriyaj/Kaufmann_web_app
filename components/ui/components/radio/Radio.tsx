import classNames from "classnames";
import type { ComponentProps } from "react";
import { forwardRef } from "react";
import { theme } from "./radio.theme";

export type RadioProps = Omit<ComponentProps<"input">, "type" | "ref">;

export const Radio = forwardRef<HTMLInputElement, RadioProps>(({ className, ...props }, ref) => {
  return <input ref={ref} className={classNames(theme.base, className)} type="radio" {...props} />;
});

Radio.displayName = "Radio";
