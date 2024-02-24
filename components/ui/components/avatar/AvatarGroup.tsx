import classNames from "classnames";
import type { ComponentProps, PropsWithChildren } from "react";
import React from "react";
import { DeepPartial } from "..";
import { avatarGroupTheme } from "./avatar.theme";

export interface FlowbiteAvatarGroupTheme {
  root: FlowbiteAvatarGroupRootTheme;
}

export interface FlowbiteAvatarGroupRootTheme {
  base: string;
}

export interface AvatarGroupProps extends PropsWithChildren<ComponentProps<"div">> {
  theme?: DeepPartial<FlowbiteAvatarGroupRootTheme>;
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({ children, className, theme: customTheme = {}, ...props }) => {
  const theme = avatarGroupTheme.avatarGroup.root;

  return (
    <div data-testid="avatar-group-element" className={classNames(theme.base, className)} {...props}>
      {children}
    </div>
  );
};

AvatarGroup.displayName = "Avatar.Group";
export default AvatarGroup;
