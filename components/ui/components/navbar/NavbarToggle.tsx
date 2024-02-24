import classNames from "classnames";
import type { ComponentProps, FC } from "react";
import SvgUser from "public/image/icon/user.svg";
import { theme } from "./navbar.theme";
import { useNavbarContext } from "./NavbarContext";

export interface NavbarToggleProps extends ComponentProps<"button"> {
  barIcon?: FC<ComponentProps<"svg">>;
}

export const NavbarToggle: FC<NavbarToggleProps> = ({ barIcon: BarIcon = SvgUser, className, ...props }) => {
  const { isOpen, setIsOpen } = useNavbarContext();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <button className={classNames(theme.toggle.base, className)} data-testid="flowbite-navbar-toggle" onClick={handleClick} {...props}>
      <span className="sr-only">Open main menu</span>
      <BarIcon className={theme.toggle.icon} />
    </button>
  );
};
