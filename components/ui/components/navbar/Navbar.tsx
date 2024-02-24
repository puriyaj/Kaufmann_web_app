"use client";
import classNames from "classnames";
import type { ComponentProps, FC, PropsWithChildren } from "react";
import { useState } from "react";
import { theme } from "./navbar.theme";
import { NavbarBrand } from "./NavbarBrand";
import { NavbarCollapse } from "./NavbarCollapse";
import { NavbarContext } from "./NavbarContext";
import { NavbarLink } from "./NavbarLink";
import { NavbarToggle } from "./NavbarToggle";

export interface NavbarComponentProps extends PropsWithChildren<ComponentProps<"nav">> {
  menuOpen?: boolean;
  fluid?: boolean;
  rounded?: boolean;
  border?: boolean;
}

const NavbarComponent: FC<NavbarComponentProps> = ({ children, menuOpen, fluid = false, rounded, border, className, ...props }) => {
  const [isOpen, setIsOpen] = useState(menuOpen);

  return (
    <NavbarContext.Provider value={{ isOpen, setIsOpen }}>
      <nav className={classNames(theme.base, theme.bordered[border ? "on" : "off"], theme.rounded[rounded ? "on" : "off"], className)} {...props}>
        <div className={classNames(theme.inner.base, theme.inner.fluid[fluid ? "on" : "off"])}>{children}</div>
      </nav>
    </NavbarContext.Provider>
  );
};

NavbarComponent.displayName = "Navbar";
NavbarBrand.displayName = "Navbar.Brand";
NavbarCollapse.displayName = "Navbar.Collapse";
NavbarLink.displayName = "Navbar.Link";
NavbarToggle.displayName = "Navbar.Toggle";

export const Navbar = Object.assign(NavbarComponent, {
  Brand: NavbarBrand,
  Collapse: NavbarCollapse,
  Link: NavbarLink,
  Toggle: NavbarToggle,
});
