import React from 'react';
import SvgEdit from '@public/image/icon/edit.svg';
import SvgDelete from '@public/image/icon/delete.svg';
import SvgView from '@public/image/icon/view.svg';
import SvgX from '@public/image/icon/x.svg';
import SvgSyringe from '@public/image/icon/syringe.svg';
import SvgCard from '@public/image/icon/card.svg';
import SvgPerson from '@public/image/icon/user.svg';
import SvgWalk from '@public/image/icon/walk.svg';
import SvgHelp from '@public/image/icon/help.svg';
import SvgLock from '@public/image/icon/lock.svg';
import SvgUnlock from '@public/image/icon/unlock.svg';
import SvgCheck from '@public/image/icon/check.svg';
import SvgGitBranch from '@public/image/icon/git-branch.svg';
import SvgAdd from '@public/image/icon/plus.svg';
import UnSeen from '@public/image/icon/unseen.svg';
import SvgMail from '@public/image/icon/mail.svg';
import SvgMoney from '@public/image/icon/money.svg';
import classNames from 'classnames';
import Link from 'next/link';

type Props = {
  type?: 'check' | 'edit' | 'delete' | 'x' | 'see' | 'unseen' | 'syringe' | 'charge' | 'person' | 'walk' | 'money' | 'help' | 'lock' | 'unlock' | 'mail' | 'stock' | 'add';
  onClick?: (ev: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => void;
  href?: string;
  label?: string;
  disabled?: boolean;
};
export const ActionButton: React.FC<Props> = ({ type, href, label, onClick, disabled = false }) => {
  let Icon = undefined;
  switch (type) {
    case 'check':
      Icon = SvgCheck;
      break;

    case 'delete':
      Icon = SvgDelete;
      break;

    case 'x':
      Icon = SvgX;
      break;

    case 'see':
      Icon = SvgView;
      break;

    case 'syringe':
      Icon = SvgSyringe;
      break;

    case 'charge':
      Icon = SvgCard;
      break;

    case 'person':
      Icon = SvgPerson;
      break;

    case 'walk':
      Icon = SvgWalk;
      break;

    case 'help':
      Icon = SvgHelp;
      break;

    case 'lock':
      Icon = SvgLock;
      break;

    case 'unlock':
      Icon = SvgUnlock;
      break;

    case 'stock':
      Icon = SvgGitBranch;
      break;

    case 'add':
      Icon = SvgAdd;
      break;

    case 'unseen':
      Icon = UnSeen;
      break;

    case 'mail':
      Icon = SvgMail;
      break;

    case 'money':
      Icon = SvgMoney;
      break;

    default:
      Icon = SvgEdit;
      break;
  }

  if (href) {
    return (
      <Link
        href={href}
        className={classNames(
          'border rounded-lg p-1 inline-flex items-center whitespace-nowrap gap-1',
          type == 'delete' ? 'hover:bg-red-500 hover:text-white' : 'hover:bg-sky-100'
        )}
        onClick={onClick}
      >
        {<Icon className="w-4 h-4" />}
        {label ? <a className="text-sm">{label}</a> : null}
      </Link>
    );
  }
  return (
    <button
      type="button"
      disabled={disabled}
      className={classNames(
        'border rounded-lg p-1 inline-flex items-center whitespace-nowrap gap-1',
        type == 'delete' ? 'hover:bg-red-500 hover:text-white' : 'hover:bg-sky-100',
        disabled && 'text-red-500 border-red-400 hover:bg-white'
      )}
      onClick={onClick}
    >
      {<Icon className="w-4 h-4" />}
      {label ? <a className="text-sm">{label}</a> : null}
    </button>
  );
};
