import { tableProps } from "@/types/types";
import React from "react";
import DataTable from "react-data-table-component";
import "./table.css";
import TablePagination from "@/utils/Pagination";
import Loader from "../Loader/Loader";

const Table: React.FC<tableProps> = ({
  data,
  style,
  header,
  totalRows,
  currentPage,
  rowsPerPage,
  setCurrentPage,
  setRowsPerPage,
  loading
}) => {
  const customStyles = {
    rows: {
      style: {
        minHeight: "40px",
        fontSize: "12px",
      },
    },
    cells: {
      style: {},
    },
    headCells: {
      style: {},
    },
    headRow: {
      style: {
        minHeight: "40px",
        fontSize: "12px",
        backgroundColor: "#F8FAFC",
      },
    },
  };
  const handleChange = () => {};
  const handlePageChange = (page: number, rowCount: number) => {
    setCurrentPage!(page);
  };
  const handlePerPageChange = (value: number) => {
    setRowsPerPage!(value);
  };

  return (
    <DataTable
      data={data!}
      columns={header}
      selectableRows
      progressPending={loading}
      progressComponent={<Loader/>}
      onSelectedRowsChange={handleChange}
      customStyles={customStyles}
      paginationTotalRows={totalRows!}
      paginationPerPage={rowsPerPage!}
      onChangeRowsPerPage={handlePerPageChange}
      onChangePage={handlePageChange}
      paginationServer
      pagination
      paginationComponent={() => (
        <TablePagination
          rowCount={totalRows!}
          rowsPerPage={rowsPerPage!}
          currentPage={currentPage!}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handlePerPageChange}
          displayTitle="Displaying"
        />
      )}
    />
  );
};

export default Table;
