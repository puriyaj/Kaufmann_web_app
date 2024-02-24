import SvgUser from "public/image/icon/user.svg";
import { Button } from "../button/Button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { searchQueryParam } from "@utils/utils";

type LoadMore<T> = {
  data: T[];
  limit: number;
  offset: number;
  hasNextPage: boolean;
  totalCount: number;
};
type Paged<T> = {
  page: number;
  pageSize: number;
  totalPages: number;
};

type Props = {
  loadMoreMeta?: LoadMore<any>;
  onLoadMore?: (offset: number, limit: number) => void;
  pagination?: Paged<any>;
  onPageChange?: (page: number) => void;
  paginationType: "seeMore" | "numbering";
  className?: string;
};
export const TablePagination: React.FC<Props> = ({ pagination, loadMoreMeta, onLoadMore, onPageChange, paginationType, className }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const seeMore = () => {
    if (loadMoreMeta && onLoadMore) {
      onLoadMore(loadMoreMeta?.data?.length, loadMoreMeta?.limit);
    }
  };

  const changePage = (page: number) => {
    searchQueryParam("page", String(page), searchParams, router, pathname);
    if (onPageChange) {
      onPageChange(page);
    }
  };

  if (pagination && pagination.totalPages <= 1) {
    return <div></div>;
  }

  if (paginationType == "numbering" && pagination) {
    return (
      <div className={`flex justify-center items-center ${className}`}>
        <Button type="button" outline className="w-10 h-10 mx-1" size="sm" onClick={() => pagination.page > 1 && changePage(pagination.page - 1)}>
          {`<`}
        </Button>

        {pagination.page > 2 && (
          <Button type="button" outline className="w-10 h-10 mx-1" size="sm" onClick={() => changePage(1)}>
            1
          </Button>
        )}
        {pagination.page - 1 > 2 && "..."}
        {pagination.page > 1 && (
          <Button type="button" outline className="w-10 h-10 mx-1" size="sm" onClick={() => changePage(pagination.page - 1)}>
            {pagination.page - 1}
          </Button>
        )}

        <Button type="button" className="w-10 h-10 mx-1" size="sm" onClick={() => changePage(pagination.page)}>
          {pagination.page}
        </Button>

        {pagination.page < pagination.totalPages && (
          <Button type="button" outline className="w-10 h-10 mx-1" size="sm" onClick={() => changePage(pagination.page + 1)}>
            {pagination.page + 1}
          </Button>
        )}
        {pagination.page < pagination.totalPages - 1 && "..."}
        {pagination.page < pagination.totalPages - 1 && (
          <Button type="button" outline className="w-10 h-10 mx-1" size="sm" onClick={() => changePage(pagination.totalPages)}>
            {pagination.totalPages}
          </Button>
        )}

        <Button type="button" outline className="w-10 h-10 mx-1" size="sm" onClick={() => pagination.page < pagination.totalPages && changePage(pagination.page + 1)}>
          {`>`}
        </Button>
      </div>
    );
  }

  return (
    <div className={`px-4 py-3 flex items-center justify-center sm:px-6 ${className}`}>
      {Number(loadMoreMeta?.totalCount) > Number(loadMoreMeta?.data?.length) && (
        <a onClick={seeMore} className="inline-flex flex-col items-center text-blue-500 hover:text-blue-700 text-sm cursor-pointer">
          <span className="inline-block mb-2">نمایش بیشتر</span>
          <SvgUser className="w-4 h-4" />
        </a>
      )}
    </div>
  );
};
