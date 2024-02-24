import classNames from "classnames";
import Link from "next/link";
import { forwardRef, type ComponentProps, type ReactNode } from "react";
import { Size, UIColors } from "../../types";
import { Spinner } from "../spinner/Spinner";
import { theme } from "./button.theme";

export interface ButtonProps extends Omit<ComponentProps<"button">, "color" | "ref"> {
  color?: keyof ButtonColors;
  href?: string;
  label?: ReactNode;
  outline?: boolean;
  fullSized?: boolean;
  pill?: boolean;
  size?: keyof ButtonSizes;
  innerClassName?: string;
  loading?: boolean;
  linktTarget?: string;
}

export interface ButtonColors extends Pick<UIColors, "dark" | "failure" | "gray" | "info" | "light" | "purple" | "success" | "warning" | "transparent"> {
  [key: string]: string;
}

export interface ButtonOutlineColors extends Pick<UIColors, "gray"> {
  [key: string]: string;
}

export interface ButtonSizes extends Pick<Size, "xs" | "sm" | "lg" | "xl"> {
  [key: string]: string;
}

const ButtonComponent = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>((propss, ref) => {
  const { children, color = "dark", disabled = false, href, label, outline = false, pill = false, fullSized, size = "md", className, innerClassName, loading = false, linktTarget, ...props } = propss;
  const isLink = typeof href !== "undefined";

  const Component = isLink ? "a" : "button";
  const theirProps = props as object;

  return (
    <Component
      className={classNames(disabled && theme.disabled, theme.color[color], outline && (theme.outline.color[color] ?? theme.outline.color.default), theme.base, theme.pill[pill ? "on" : "off"], fullSized && theme.fullSized, className)}
      disabled={disabled || loading}
      href={href}
      type={isLink ? undefined : "button"}
      ref={ref as never}
      {...(isLink && { target: linktTarget })}
      {...theirProps}
    >
      <span className={classNames(innerClassName, theme.inner.base, theme.outline[outline ? "on" : "off"], theme.outline.pill[outline && pill ? "on" : "off"], theme.size[size], outline && !theme.outline.color[color] && theme.inner.outline)}>
        <>
          {typeof children !== "undefined" && !loading && children}
          {typeof label !== "undefined" && !loading && (
            <span className={theme.label} data-testid="flowbite-button-label">
              {label}
            </span>
          )}
          {loading && <Spinner aria-label="Spinner button example" />}
        </>
      </span>
    </Component>
  );
});

ButtonComponent.displayName = "Button";
export const Button = Object.assign(ButtonComponent, {});
