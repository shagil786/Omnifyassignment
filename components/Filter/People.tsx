import React, { useEffect, useState } from "react";
import Search from "../Search/Search";
import { debounce } from "@/utils/useDebounce";
import { peopleSearch } from "@/utils/api-utils";
import { optionsProps } from "@/types/types";
import Checkbox from "../Checkbox/Checkbox";
import { useDeveloperData } from "@/utils/appContext";

const People = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState([]);
  const {appData, setAppData}: any = useDeveloperData();
  const [checkedData, setCheckedData] = useState<Array<string>>(appData?.checkedData ?? []);

  const handleChange = (event: any) => {
    setSearchValue(event.target?.value);
  };

  function userData(searchText: string) {
    peopleSearch(searchText)
      .then((response) => {
        setSearchData(response);
      })
      .catch((err) => {
        setSearchData([]);
      });
  }

  const debunceSearch = debounce(userData, 500);

  useEffect(() => {
    if (searchValue) debunceSearch(searchValue);
  }, [searchValue]);

  const handleChecked = (each: any) => {
    let updatedArray = [...checkedData];
    const index = updatedArray?.indexOf(each);

    if (index === -1) {
      updatedArray.push(each);
    } else {
      updatedArray?.splice(index, 1);
    }
    setCheckedData(updatedArray);
  };

  useEffect(() => {
    setAppData((prev: any) => ({
      ...prev,
      checkedData: checkedData
    }))
  },[checkedData]);

  return (
    <div
      className="p-2 flex flex-col gap-4"
      style={{
        width: "calc(100% - 28vmin)",
      }}
    >
      <Search
        value={searchValue}
        onChange={handleChange}
        name="peopleSearch"
        placeholder="Search Player or attendee name"
        style={{
          padding: "6px",
        }}
      />
      <div className="flex flex-col gap-2 text-xs">
        {searchValue ? (
          <span>
            Showing {searchData?.length} results mateching '{searchValue}'
          </span>
        ) : null}
        <div className="flex flex-col gap-1">
          {searchData?.map((each: any, index: number) => (
            <div className="flex gap-2 items-center" key={index}>
              <Checkbox
                style="w-[14px] h-[14px] rounded-sm"
                checked={checkedData?.includes(each) ? true : false}
                onChange={() => handleChecked(each)}
              />
              <span className="pr-1">{each?.name}</span>
              <span className="text-[10px] bg-[#F8FAFC] p-[2px_8px_2px_8px]">{each?.type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default People;
