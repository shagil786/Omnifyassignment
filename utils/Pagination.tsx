import NumericInput from "@/components/CustomNumericInput/NumericInput";
import Dropdown from "@/components/Dropdown/Dropdown";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useMemo } from "react";
import { PaginationComponentProps as DataTablePaginationComponentProps } from "react-data-table-component";

interface TablePaginationProps extends DataTablePaginationComponentProps {
  paginationRowsPerPageOptions?: number[];
  displayTitle?: string;
}

export default function TablePagination({
  currentPage,
  rowCount,
  onChangePage,
  paginationRowsPerPageOptions,
  rowsPerPage,
  onChangeRowsPerPage,
  displayTitle,
}: TablePaginationProps) {
  const totalPages = Math.ceil(rowCount / rowsPerPage);
  const paginationArray: Array<number> = useMemo(() => {
    const pages: Set<number> = new Set();
    pages.add(currentPage);
    if (currentPage + 1 <= totalPages) {
      pages.add(currentPage + 1);
    }
    if (totalPages > 1 && currentPage < totalPages - 1) {
      pages.add(totalPages);
    }
    if (currentPage === totalPages) {
      pages.add(1);
      pages.add(currentPage - 1);
    }
    return Array.from(pages).sort((a: number, b: number) => a - b);
  }, [currentPage, totalPages]);

  const handleMovePage = (dir: string) => {
    let newValue = dir === "+" ? currentPage + 1 : currentPage - 1;
    onChangePage(newValue, rowCount);
  };

  return (
    <div className="w-full flex justify-between items-center p-2">
      <div className="flex gap-4 items-center">
        <span>{displayTitle}</span>
        <NumericInput
          value={rowsPerPage}
          onChange={onChangeRowsPerPage}
          style="rounded-md leading-6 text-[14px]"
        />
        <span>out of <strong>{rowCount}</strong></span>
      </div>
      <div className="flex gap-4 items-center">
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="cursor-pointer"
          onClick={() => (currentPage - 1 <= 0 ? null : handleMovePage("-"))}
        />
        <span>Previous</span>
        <div className="flex">
          {paginationArray?.map((page: number, index: number) => (
            <button
              key={`${page}_${index}`}
              className={`p-2 ${
                currentPage === page
                  ? "border-[1px] border-[#E2E8F0] px-4 rounded-md"
                  : ""
              }`}
              onClick={() => onChangePage(page, rowCount)}
            >
              {page}
            </button>
          ))}
        </div>
        <span>Next</span>
        <FontAwesomeIcon
          icon={faChevronRight}
          className="cursor-pointer"
          onClick={() =>
            currentPage + paginationArray?.length > totalPages ? null : handleMovePage("+")
          }
        />
      </div>
    </div>
  );
}
