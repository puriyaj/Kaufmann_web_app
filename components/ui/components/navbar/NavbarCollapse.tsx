import classNames from "classnames";
import type { ComponentProps, FC, PropsWithChildren, ReactElement } from "react";
import { theme } from "./navbar.theme";
import { useNavbarContext } from "./NavbarContext";

export type NavbarCollapseProps = PropsWithChildren<ComponentProps<"div">> & {
  isSubMenu?: boolean;
};

export const NavbarCollapse: FC<NavbarCollapseProps> = ({ children, className, ...props }): ReactElement => {
  const { isOpen } = useNavbarContext();

  return (
    <div className={classNames(theme.collapse.base, theme.collapse.hidden[!isOpen ? "on" : "off"], className)} data-testid="flowbite-navbar-collapse" {...props}>
      <ul className={theme.collapse.list}>{children}</ul>
    </div>
  );
};
