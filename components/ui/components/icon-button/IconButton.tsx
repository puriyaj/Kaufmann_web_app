import Link from 'next/link';
import React from 'react';
import { colors, iconSizes, sizes } from '../ui-constant';

type Props = React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & {
  href?: string;
  icon?: any;
  Size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'raw' | 'primary' | 'secondary' | 'outline-primary' | 'outline-secondary';
  iconStyle?: string;
};

export const IconButton: React.FC<Props> = ({ href, icon, theme = 'raw', Size = 'md', children, className = '', iconStyle, ref, ...props }) => {
  let btnColor = colors[theme];
  let btnSize = sizes(!!icon)[Size];
  let iconSize = iconSizes[Size];

  let Icon = icon;

  if (href) {
    return (
      <Link href={href} {...props} className={`inline-block rounded-lg select-none print:hidden cursor-pointer ${btnSize} ${btnColor} ${className}`}>
        {Icon ? <Icon className={`inline-block  ${iconSize} `} /> : null}
        {children}
      </Link>
    );
  } else {
    return (
      <a {...props} className={`inline-flex items-center rounded-lg select-none print:hidden cursor-pointer ${btnSize} ${btnColor} ${className}`}>
        {Icon ? <Icon className={`inline-block ${iconSize} ${iconStyle}`} /> : null}
        {children}
      </a>
    );
  }
};
