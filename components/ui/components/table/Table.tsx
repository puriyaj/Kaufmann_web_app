'use client';
import React, { ReactElement, useRef, useState } from 'react';
import SvgLoading from './SvgLoading.svg';
import NotFoundImg from './not-found.webp';
import { TablePagination } from './TablePagination';
import classNames from 'classnames';
import Image from 'next/image';

type LoadMore<T> = {
  data: T[];
  limit: number;
  offset: number;
  hasNextPage: boolean;
  totalCount: number;
};

type Paged<T> = {
  data?: T[];
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
};

type Props = {
  // onChangePage?: (page: number, pageSize: number) => void
  hiddenHeaders?: boolean;
  loadMore?: LoadMore<any>;
  onLoadMore?: (offset: number, limit: number) => void;
  pagination?: Paged<any>;
  onPageChange?: (page: number) => void;
  tableHead: (TableHead | undefined)[];
  size?: 'xs' | 'sm' | 'md' | 'lg';
  containerClassName?: string;
  data: {
    [key: string]: ((seeMoreClicked?: () => void) => React.ReactNode) | number | string | React.ReactNode | ReactElement;
  }[];
  loading?: boolean;
  paginationType?: 'seeMore' | 'numbering';
  footerValues?: {
    total?: React.ReactNode;
    totalDiscount?: React.ReactNode;
    payment?: React.ReactNode;
    remind?: React.ReactNode;
    extra?: React.ReactNode;
  };
  tableClassName?: string;
  tbodyClassName?: string;
  theadClassName?: string;
  selectable?: boolean;
  onSelectItem?: (ids: (string | number)[]) => void;
  selectedItems?: (number | string)[];
  LoadingIcon?: React.ReactNode;
};

export type TableHead = {
  id: string;
  name?: string | React.ReactNode;
  className?: string;
  sortable?: boolean;
  minWidth?: boolean | string;
  dataAlign?: 'start' | 'center' | 'end';
  unprintable?: boolean;
};

const paddingSizes = {
  xs: 'px-2 py-1 text-xs print:text-xs',
  sm: 'px-2 py-1 text-sm print:text-xs',
  md: 'px-6 py-2 text-md print:text-sm',
  lg: 'px-6 py-3 text-lg print:text-base',
};
const textAligns = {
  start: 'text-start',
  center: 'text-center',
  end: 'text-end',
};

export const Table: React.FC<Props> = ({
  selectedItems,
  size = 'md',
  loading = true,
  selectable = false,
  pagination,
  onLoadMore,
  onPageChange,
  footerValues,
  hiddenHeaders,
  tableClassName,
  theadClassName,
  tbodyClassName,
  onSelectItem,
  LoadingIcon,
  ...props
}) => {
  const [openDetail, setOpenDetail] = useState<number>();
  // const [checkboxesValue, setCheckboxValue] = useState<{ id: number | string; checked: boolean }[]>([])
  const pSize = paddingSizes[size];
  const mainCheckboxRef = useRef<HTMLInputElement>(null);
  const [sortField, setSortField] = useState<string>('');

  const handleSort = (target: string) => {
    if (!sortField.includes(target)) {
      setSortField(`${target}:desc`);
    } else if (sortField.includes(`${target}:desc`)) {
      setSortField(`${target}:asc`);
    } else {
      setSortField('');
    }
  };

  // useEffect(() => {

  // }, [props.data])

  const toggleAllItems = (checked: boolean) => {
    if (onSelectItem) {
      if (checked) {
        onSelectItem(props.data.map((row) => row['id'] as string));
      } else {
        onSelectItem([]);
      }
    }
    // setCheckboxValue(checkboxesValue.map((x) => ({ id: x.id, checked })))
  };

  // onSelectItem(checkboxesValue.filter((x) => x.checked).map((x) => x.id))

  // useEffect(() => {
  //   if (onSelectItem) {
  //     onSelectItem(checkboxesValue.filter((x) => x.checked).map((x) => x.id))
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [checkboxesValue])

  // useEffect(() => {
  //   if (mainCheckboxRef.current) {
  //     if (selectedItems && selectedItems.length > 0 && checkboxesValue.filter((x) => x.checked).length != checkboxesValue.length) {
  //       mainCheckboxRef.current.indeterminate = true
  //     } else {
  //       mainCheckboxRef.current.indeterminate = false
  //     }
  //     // if (checkboxesValue && checkboxesValue.filter((x) => x.checked).length == 0) {
  //     //   mainCheckboxRef.current.indeterminate = false
  //     // }
  //   }
  // }, [selectedItems])

  return (
    <>
      <div className={`flex-col border rounded-xl dark:border-gray-700 print:border-none relative min-h-[250px] print:min-h-0 ${props.containerClassName ?? ''}`}>
        {loading && (
          <div
            className="absolute left-0 right-0 top-0 bottom-0 z-20 flex justify-center items-center print:hidden"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.15)', minHeight: 50 }}
          >
            <div className="inline-flex flex-col items-center justify-center relative">
              {LoadingIcon ? LoadingIcon : <SvgLoading className="w-14 mb-3" />}
              <span className={`dark:text-gray-500 ${LoadingIcon && '-mt-8'}`}>Updating...</span>
            </div>
          </div>
        )}
        <table className={classNames('w-full overflow-x-scroll rounded-xl min-w-[200px]', tableClassName)}>
          {!hiddenHeaders && (
            <thead className={classNames('bg-gray-100 dark:bg-gray-800 border-b dark:border-gray-800 z-[9999]', theadClassName)}>
              <tr>
                {selectable && (
                  <th scope="col" className={`font-light whitespace-nowrap print:border print:bg-gray-100 text-gray-600 dark:text-gray-200 print:hidden `}>
                    <input
                      type="checkbox"
                      ref={mainCheckboxRef}
                      checked={!!(selectedItems && props.data && selectedItems.length == props.data.length && selectedItems.length > 0)}
                      onChange={(e) => toggleAllItems(e.currentTarget.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-lg dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                    />
                  </th>
                )}

                {props.tableHead.map((thItem, index) => {
                  if (!thItem) return;
                  const txtAlign = textAligns[thItem?.dataAlign ?? 'start'];
                  return (
                    <th
                      key={index}
                      scope="col"
                      className={`${txtAlign} font-bold whitespace-nowrap print:border print:bg-gray-100 text-gray-600 dark:text-gray-200 ${pSize} ${typeof thItem.minWidth == 'boolean' && thItem.minWidth ? 'w-0' : thItem.minWidth} ${thItem.unprintable ? 'print:hidden' : ''} ${
                        thItem.className ?? ''
                      }`}
                    >
                      {!thItem.sortable ? (
                        thItem.name
                      ) : (
                        <div
                          className={`${txtAlign}  flex justify-center items-center cursor-pointer ${sortField.includes(thItem.id) && 'text-sky-300'}`}
                          onClick={() => handleSort(thItem.id)}
                        >
                          {thItem.name}
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512">
                            <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                          </svg>
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>
          )}
          <tbody className={classNames(tbodyClassName)}>
            {props.data.length == 0 && !loading && (
              <tr className="print:hidden">
                <td colSpan={props.tableHead.length}>
                  <div className="flex flex-col justify-center items-center p-8">
                    <Image src={NotFoundImg} className="w-20 h-20" alt="" />
                    <p className="text-gray-500 mt-5 text-sm">Nothing Found</p>
                  </div>
                </td>
              </tr>
            )}
            {props.data
              .sort((a, b) => {
                if (sortField) {
                  if (typeof a[sortField.split(':')?.[0]] == 'string') {
                    return sortField.split(':')?.[1] == 'asc'
                      ? Number(a[sortField.split(':')?.[0]]) - Number(b[sortField.split(':')?.[0]])
                      : Number(b[sortField.split(':')?.[0]]) - Number(a[sortField.split(':')?.[0]]);
                  } else {
                    return sortField.split(':')?.[1] == 'asc'
                      ? Number((a[sortField.split(':')?.[0]] as React.ReactElement)?.props?.id) - Number((b[sortField.split(':')?.[0]] as React.ReactElement)?.props?.id)
                      : Number((b[sortField.split(':')?.[0]] as React.ReactElement)?.props?.id) - Number((a[sortField.split(':')?.[0]] as React.ReactElement)?.props?.id);
                  }
                } else {
                  return 0;
                }
              })
              .map((row, rowIndex) => {
                const rowClass = row['rowClass'];
                return (
                  <React.Fragment key={rowIndex}>
                    <tr
                      className={`${rowClass ? rowClass : rowIndex % 2 == 1 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'} ${row.seeMore ? 'cursor-pointer' : ''} border-b dark:border-gray-800`}
                    >
                      {selectable && (
                        <td className={`relative text-gray-900 dark:text-gray-100 text-center print:border print:hidden`}>
                          <input
                            type="checkbox"
                            checked={selectedItems?.some((x) => x == row['id'])}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-lg dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                            onChange={(e) => {
                              if (onSelectItem) {
                                if (e.target.checked) {
                                  onSelectItem([...(selectedItems ?? []), row['id'] as string]);
                                } else {
                                  onSelectItem((selectedItems ?? []).filter((x) => x != (row['id'] as string)));
                                }
                              }
                              // checkboxesValue[rowIndex].checked = e.currentTarget?.checked
                              // setCheckboxValue([...checkboxesValue])
                            }}
                          />
                        </td>
                      )}
                      {props.tableHead
                        // .filter((x) => typeof x != "undefined")
                        .map((x) => x?.id)
                        .map((key, colIndex) => {
                          if (typeof key == 'undefined') return;
                          let res;
                          let val = row[key] ?? '';
                          const txtAlign = textAligns[props.tableHead[colIndex]?.dataAlign ?? 'start'];
                          const cellClassName = props.tableHead[colIndex]?.className ?? '';
                          const cellUnprintable = props.tableHead[colIndex]?.unprintable ?? '';
                          if (typeof val == 'function') {
                            res = val(() => (rowIndex == openDetail ? setOpenDetail(undefined) : setOpenDetail(rowIndex)));
                          } else {
                            res = val;
                          }
                          return (
                            <td key={colIndex} className={classNames(`relative text-gray-900 dark:text-gray-100 print:border`, txtAlign, pSize, cellUnprintable, cellClassName)}>
                              {res}
                            </td>
                          );
                        })}
                    </tr>
                    {row.seeMore && openDetail == rowIndex && (
                      <tr>
                        <td colSpan={props.tableHead.length + (selectable ? 1 : 0)}>{typeof row.seeMore == 'function' ? row.seeMore() : row.seeMore}</td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
          </tbody>
        </table>
      </div>
      {(pagination || props.loadMore?.hasNextPage) && (
        <TablePagination
          loadMoreMeta={props.loadMore}
          pagination={pagination}
          onLoadMore={onLoadMore}
          onPageChange={onPageChange}
          paginationType={props.paginationType ?? 'seeMore'}
          className="mt-4"
        />
      )}
    </>
  );
};
