import classNames from "classnames";
import type { ComponentProps, FC, KeyboardEvent, MouseEvent } from "react";
import { useId } from "react";
import { UIColors } from "../../types";
import { theme } from "./toggleSwitch.theme";

export type ToggleSwitchProps = Omit<ComponentProps<"button">, "onChange"> & {
  checked: boolean;
  label: string;
  color?: UIColors;
  onChange: (checked: boolean) => void;
};

export const ToggleSwitch: FC<ToggleSwitchProps> = ({ checked, disabled, label, name, onChange, className, color = "blue", ...props }) => {
  const id = useId();

  const toggle = (): void => onChange(!checked);

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    toggle();
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLButtonElement>): void => {
    event.preventDefault();
  };

  return (
    <>
      {name && checked && <input checked={checked} hidden name={name} readOnly type="checkbox" className="sr-only" />}
      <button
        dir="ltr"
        aria-checked={checked}
        aria-labelledby={`${id}-flowbite-toggleswitch-label`}
        disabled={disabled}
        id={`${id}-flowbite-toggleswitch`}
        onClick={handleClick}
        onKeyPress={handleKeyPress}
        role="switch"
        tabIndex={0}
        type="button"
        className={classNames(theme.base, theme.active[disabled ? "off" : "on"], className)}
        {...props}
      >
        <div className={classNames("peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:transition-all ", theme.toggle.base, theme.toggle.checked[checked ? "on" : "off"], !disabled && theme.toggle.checked.color[color])} />
        <span data-testid="flowbite-toggleswitch-label" id={`${id}-flowbite-toggleswitch-label`} className={theme.label}>
          {label}
        </span>
      </button>
    </>
  );
};
