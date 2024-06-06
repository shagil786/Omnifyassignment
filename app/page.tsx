"use client";
import Filter from "@/components/Filter/Filter";
import Search from "@/components/Search/Search";
import Table from "@/components/Table/Table";
import {
  cardList,
  dataProps,
  selectedProps,
  tableApiProps,
} from "@/types/types";
import { getHeaderData, getTableData } from "@/utils/api-utils";
import { useDeveloperData } from "@/utils/appContext";
import { columns } from "@/utils/utility";
import React, { Fragment, useEffect, useRef, useState } from "react";
import refreshIcon from "@/public/images/refresh-ccw.svg";
import columnsIcon from "@/public/images/columns.svg";
import downloadIcon from "@/public/images/download.svg";
import Image from "next/image";
import Modal from "@/components/Modal/Modal";
import EditColumn from "@/components/EditColumn/EditColumn";
import { Position } from "@/utils/getPositions";
import { debounce } from "@/utils/useDebounce";
import { convertToCSV, downloadCSV } from "@/utils/toCsv";
import ShowFilter from "@/components/Filter/ShowFilter";

const page = () => {
  const myRef = useRef(null);
  const { appData, setAppData } = useDeveloperData();
  const [data, setData] = useState<Array<dataProps>>();
  const [loading, setLoading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>("");
  const [totalRows, setTotalRows] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showColumn, setShowColumn] = useState(false);
  const [checkbox, setCheckbox] = useState<Array<number>>([
    0, 1, 2, 3, 4, 5, 6,
  ]);
  const [headerData, setHeaderData] = useState([]);

  const cardList: Array<cardList> = [
    { name: "All Waitlists", value: 100 },
    { name: "Newly Added", value: 50 },
    { name: "Leads", value: 20 },
  ];

  function tableData({ searchText, page, pageSize }: tableApiProps) {
    getTableData({
      searchText: searchText ?? "",
      page: page,
      pageSize: pageSize,
    })
      .then((response) => {
        setData(response?.rows);
        setTotalRows(response?.totalCount);
        setLoading(false);
      })
      .catch((err) => {
        setData([]);
        setTotalRows(0);
        setLoading(false);
      });
  }

  useEffect(() => {
    tableData({ page: currentPage, pageSize: rowsPerPage });
  }, [currentPage, rowsPerPage]);

  const debunceSearch = debounce(tableData, 500);

  useEffect(() => {
    if (searchValue)
      debunceSearch({
        searchText: searchValue,
        page: currentPage,
        pageSize: rowsPerPage,
      });
  }, [searchValue]);

  useEffect(() => {
    getHeaderData()
      .then((response) => {
        setHeaderData(response);
      })
      .catch((err) => {
        setHeaderData([]);
      });
  }, []);

  const handleChange = (event: any) => {
    setSearchValue(event.target?.value);
  };

  const handleCheckbox = (each: selectedProps) => {
    let updatedArray = [...checkbox];
    const index = updatedArray?.indexOf(each?.id);

    if (index === -1) {
      updatedArray.push(each?.id);
    } else {
      updatedArray?.splice(index, 1);
    }
    setCheckbox(updatedArray);
  };

  const handleApply = () => {
    setShowColumn(false);
  };

  const handleReset = () => {
    setCheckbox([0, 1, 2, 3, 4, 5, 6]);
    handleApply();
  };

  const handleDownload = () => {
    downloadCSV(data!);
  };

  return (
    <Fragment>
      <div
        className="h-full p-2 "
        style={{
          width: appData?.collapse
            ? "calc(100% - 10vmin)"
            : "calc(100% - 42vmin)",
        }}
      >
        <div className="bg-white h-full rounded-md w-full">
          <div className="px-4">
            <p className="pt-4 pb-2 text-[20px] leading-7 font-[600]">
              Waitlist
            </p>
            <div className="flex gap-4 py-4">
              {cardList?.map((each: cardList, index: number) => (
                <div
                  className="flex p-[10px_12px_10px_12px] text-xs border-[1px] border-[#64748B] gap-2 w-full rounded-md"
                  key={index}
                >
                  <span className="font-[600]">{each?.name}</span>
                  <span className="font-[400]">{each?.value}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between pb-4">
              <div className="flex items-center gap-4">
                <Filter />
                <ShowFilter/>
              </div>
              <div className="flex gap-6" ref={myRef}>
                <Search
                  placeholder="Search client"
                  name="search"
                  value={searchValue}
                  onChange={handleChange}
                  style={{
                    width: "40vmin",
                    padding: "4px 0px",
                  }}
                />
                <Image src={refreshIcon} alt="refresh" width={16} height={16} />
                <Image
                  src={columnsIcon}
                  alt="column"
                  width={16}
                  height={16}
                  onClick={() => setShowColumn((prev) => !prev)}
                />
                <Image
                  src={downloadIcon}
                  alt="download"
                  width={16}
                  height={16}
                  onClick={handleDownload}
                />
              </div>
            </div>
            <div className="w-full overflow-hidden text-xs border-[1px] border-[#E2E8F0] rounded-sm">
              <Table
                data={data}
                header={columns(checkbox)}
                loading={loading}
                totalRows={totalRows}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={showColumn}
        setIsOpen={setShowColumn}
        style="flex-col gap-1 p-4 w-[42vmin]"
        onClose={() => {}}
        myRef={myRef}
        position={Position.Top}
      >
        <EditColumn
          selected={checkbox!}
          options={headerData}
          onChange={handleCheckbox}
          onApply={handleApply}
          onReset={handleReset}
        />
      </Modal>
    </Fragment>
  );
};

export default page;
