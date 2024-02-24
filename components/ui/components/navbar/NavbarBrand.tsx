import classNames from "classnames";
import Link from "next/link";
import type { ComponentProps, FC, PropsWithChildren } from "react";
import { theme } from "./navbar.theme";

export type NavbarBrandProps = PropsWithChildren<ComponentProps<"a">>;

export const NavbarBrand: FC<NavbarBrandProps> = ({ children, href, className, ...props }) => {
  return (
    <Link href={href!} className={classNames(theme.brand, className)}>
      {children}
    </Link>
  );
};
