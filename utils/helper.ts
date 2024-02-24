import moment from "moment-jalaali";
import { PAGE_SIZE } from "./constants";

// export const paginatedReponseFetchMore = (data: any[], limit: number, offset: number, count: number, options?: { moreData?: any }) => {
//   const noramlData = JSON.parse(
//     JSON.stringify(
//       data,
//       (key, value) => (typeof value === "bigint" ? value.toString() : value), // return everything else unchanged
//     ),
//   );
//   return {
//     data: noramlData,
//     hasNextPage: limit + offset <= count,
//     limit,
//     offset,
//     totalCount: count,
//     ...(options?.moreData ?? []),
//   };
// };

export const paginatedResponse = (data: any[], pageSize: number, page: number, count: number, options?: { moreData?: any }) => {
  const noramlData = JSON.parse(
    JSON.stringify(
      data,
      (key, value) => (typeof value === "bigint" ? value.toString() : value), // return everything else unchanged
    ),
  );
  return {
    data: noramlData,
    page,
    pageSize,
    totalPages: Math.ceil(count / PAGE_SIZE),
    total: count,
    ...(options?.moreData ?? []),
  };
};

export const numricPaginatedReponse = (data: any[], page: number, limit: number, totalCount: number, options?: { moreData?: any }) => {
  const noramlData = JSON.parse(
    JSON.stringify(
      data,
      (key, value) => (typeof value === "bigint" ? value.toString() : value), // return everything else unchanged
    ),
  );

  return {
    data: noramlData,
    page,
    limit,
    totalPages: Math.ceil(totalCount / limit),
    hasNextPage: page < Math.ceil(totalCount / limit),
    ...(options?.moreData ?? []),
  };
};

export const normalizeData = (data: any) => {
  return JSON.parse(JSON.stringify(data, (key, value) => (typeof value === "bigint" ? value.toString() : value)));
};

export const getTodayStart = () => {
  return moment().startOf("day").toDate();
};

export const getYesterdayStart = () => {
  return moment().subtract(1, "days").startOf("day").toDate();
};

export const getTodayEnd = () => {
  return moment().endOf("day").toDate();
};
