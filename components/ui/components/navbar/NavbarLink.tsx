import classNames from "classnames";
import type { ComponentProps, FC, PropsWithChildren } from "react";
import { theme } from "./navbar.theme";
import Link from "next/link";

export interface NavbarLinkProps extends PropsWithChildren<ComponentProps<"a">> {
  active?: boolean;
  disabled?: boolean;
  label?: React.ReactNode;
  href?: string;
}

export const NavbarLink: FC<NavbarLinkProps> = ({ active, disabled, href, children, className, label, ...props }) => {
  return (
    <li>
      <Link
        href={href ?? ""}
        className={classNames(
          theme.link.base,
          {
            [theme.link.active.on]: active,
            [theme.link.active.off]: !active && !disabled,
          },
          theme.link.disabled[disabled ? "on" : "off"],
          className,
        )}
        // {...props}
      >
        {label}
        {active ? children : null}
      </Link>
    </li>
  );
};
