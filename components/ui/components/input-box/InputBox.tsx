"use client";
import classNames from "classnames";
import React from "react";
import { Control, RegisterOptions, useController } from "react-hook-form";

import "./style.css";
import { convertNumToAlpha } from "@cmp/ui/helper/number-alpha";
import { realNumber } from "@utils/utils";

interface props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  name: string;
  control: Control<any>;
  rules?: Omit<RegisterOptions<any, any>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled">;
  labelStype?: string;
  containerClassName?: string;
  innerContainerClassName?: string;
  isNumric?: boolean;
  isCurrency?: boolean;
  mb?: string;
  icon?: any;
  hideCurrenctyTag?: boolean;
  textAlign?: string;
  currencyTag?: string | React.ReactNode;
  includeHyphenSign?: boolean;
  // onKeyUp2?: (ev: React.KeyboardEvent<HTMLInputElement>) => void
  // value?: string | number | undefined
}

// eslint-disable-next-line react/display-name
export const InputBox: React.FC<props> = (props) => {
  const { control, name, rules, labelStype = "", className, containerClassName = "", innerContainerClassName = "", isCurrency = false, isNumric = false, value, mb = "mb-0", icon, hideCurrenctyTag, autoFocus, currencyTag = "تومان", textAlign, includeHyphenSign = false, style, ...rest } = props;
  const { field, fieldState } = useController({ name, control, rules });
  const error = fieldState.error;

  let renderIcon = icon;

  if (icon) {
    if (typeof icon == "function") {
      const IconR = icon;
      renderIcon = <IconR className="inline-flex items-center ms-2 flex-grow-0 select-none w-5 h-5" />;
    }

    if (typeof icon == "object") {
      renderIcon = <span className="inline-flex items-center ms-2 flex-grow-0 select-none me-1">{icon}</span>;
    }
  }

  const persianToEnglish = (str: string | number | undefined) => {
    let _str = str ? str.toString() : "";
    // convert persian number to english
    _str = _str.replace(/[\u0660-\u0669\u06f0-\u06f9]/g, (c: any) => (c.charCodeAt(0) & 0xf).toString());
    // remove alphbet
    // _str = _str.replace(/[\D]*/gi, "")
    _str = _str.replace(/([a-zA-Zآ-ی])?([@#$%^!*_])?/g, "");

    if (includeHyphenSign) {
      // remove hyphen from end
      _str = _str.endsWith("-") && _str.length > 1 ? _str.substring(0, _str.length - 1) : _str;
    } else {
      // remove all hyphen signs
      _str = _str.replace(/-\|+|=/g, "");
    }

    if (isNumric || isCurrency) {
      _str = _str.replace(/\s/g, "");
    }

    // remove extra dots
    if (_str.endsWith(".")) {
      if (_str.search(/[.]/g) != _str.length - 1) {
        _str = _str.substring(0, _str.length - 1);
      }
    }

    return _str;
  };

  const removeThousandSeparator = (str: string) => {
    return str.replace(/,/g, "");
  };

  const applyThousandSeparator = (str: string | number | undefined) => {
    let _str = str ? str.toString() : "";
    _str = _str.replace(/\D/g, "");
    _str = _str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return _str;
  };

  const onChangeHandle = (e: React.ChangeEvent<any>) => {
    let val = e.currentTarget.value;

    if (isCurrency || isNumric) {
      val = persianToEnglish(removeThousandSeparator(e.target.value));
    }

    field.onChange(val);
    return val;
  };

  const sanatizeValue = (_value: string | number | readonly string[] | undefined): string => {
    let val = _value?.toString() ?? "";

    if (isNumric) {
      val = persianToEnglish(val);
      if (includeHyphenSign) {
        val = val.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    } else if (isCurrency) {
      val = applyThousandSeparator(val);
    }

    return val;
  };

  return (
    <div className={classNames(`flex flex-col items-stretch`, mb, containerClassName)}>
      <div
        className={classNames(
          `flex items-center flex-row border dark:border-gray-500 hover:border-gray-400 duration-300 rounded-lg`,
          rest.disabled ? "bg-gray-50 dark:bg-gray-600" : "bg-white dark:bg-gray-700",
          error ? "!border-red-600 !text-red-600 dark:!border-red-600" : "text-gray-400",
          innerContainerClassName,
        )}
      >
        {renderIcon}

        <label className={classNames(`inp-wrapper w-full rounded-lg flex flex-row justify-center`, labelStype)}>
          <input
            autoFocus={autoFocus}
            {...rest}
            // ref={ref}
            className={classNames(`inp-input w-full py-2 px-1 flex-1 rounded-lg outline-none border-none text-gray-900 text-sm dark:text-gray-100 bg-transparent`, className)}
            // onKeyUp={(ev) => formatNumber(ev, isNumric, isCurrency, onKeyUp)}
            // onChange={onChangeHandle}
            // onBlur={(ev) => formatNumber(ev, isNumric, isCurrency, onBlur)}
            style={{ textAlign: textAlign as any, ...(style ?? {}) }}
            onInput={onChangeHandle}
            value={sanatizeValue(field.value)}
            onFocus={(ev) => ev.target.select()}
            // defaultValue={formatNumberDefaultValue(isNumric, isCurrency, defaultValue)}
          ></input>

          {!hideCurrenctyTag && isCurrency && <span className="tooltip whitespace-nowrap z-60">{convertNumToAlpha(realNumber(field.value * 10))} تومان</span>}

          <span className="inp-label text-xs select-none">{rest.placeholder}</span>
          {(isCurrency || isNumric) && !hideCurrenctyTag && <span className="inline-flex items-center px-2 select-none bg-gray-50 dark:bg-gray-600 text-xs rounded-l-lg">{currencyTag}</span>}
        </label>
      </div>
      {error && <small className="w-full text-red-500 text-xs pl-4">{error.message}</small>}
    </div>
  );
};
