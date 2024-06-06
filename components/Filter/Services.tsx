import React, { useEffect, useState } from "react";
import RadioButton from "../RadioButton/RadioButton";
import Search from "../Search/Search";
import { debounce } from "@/utils/useDebounce";
import { serviceSearch } from "@/utils/api-utils";
import Checkbox from "../Checkbox/Checkbox";
import Dropdown from "../Dropdown/Dropdown";
import { optionsProps } from "@/types/types";
import { useDeveloperData } from "@/utils/appContext";

const Services = () => {
  const radio = ["Search by name", "Search by tags"];
  const [searchValue, setSearchValue] = useState("");
  const {appData, setAppData}: any = useDeveloperData();
  const [value, setValue] = useState<string>(appData?.searchBy ?? "Search by name");
  const [searchData, setSearchData] = useState<any>([]);
  const [checkedData, setCheckedData] = useState<Array<string>>(appData?.checkedData ?? []);
  const [value1, setValue1] = useState<optionsProps>(appData?.service);
  const [value2, setValue2] = useState<optionsProps>(appData?.status);
  const dropdownData: Array<optionsProps> = [
    {
      name: "Show all service type",
      id: 0,
    },
    {
      name: "Class",
      id: 1,
    },
    {
      name: "Appointment",
      id: 2,
    },
    {
      name: "Facility",
      id: 3,
    },
    {
      name: "Class Pack",
      id: 4,
    },
    {
      name: "Membership",
      id: 5,
    },
    {
      name: "General items",
      id: 6,
    },
  ];

  const dropdownData1: Array<optionsProps> = [
    {
      name: "Show all",
      id: 0,
    },
    {
      name: "Public",
      id: 1,
    },
    {
      name: "Private",
      id: 2,
    },
    {
      name: "Disable",
      id: 3,
    },
    {
      name: "Draft",
      id: 4,
    },
  ];

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

  const handleClick = (each: string) => {
    setValue(each);
  };

  const handleChange = (event: any) => {
    setSearchValue(event.target?.value);
  };

  function userData(searchText: string) {
    serviceSearch(searchText)
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

  const handleChange1 = (each: optionsProps) => {
    setValue1(each);
  };

  const handleChange2 = (each: optionsProps) => {
    setValue2(each);
  };

  useEffect(() => {
    setAppData((prev: any) => ({
      ...prev,
      searchBy: value
    }))
  },[value]);

  useEffect(() => {
    setAppData((prev: any) => ({
      ...prev,
      checkedData: checkedData
    }))
  },[checkedData]);

  useEffect(() => {
    setAppData((prev: any) => ({
      ...prev,
      service: value1
    }))
  },[value1]);

  useEffect(() => {
    setAppData((prev: any) => ({
      ...prev,
      status: value2
    }))
  },[value2]);

  return (
    <div
      className="p-2 flex flex-col gap-4"
      style={{
        width: "calc(100% - 28vmin)",
      }}
    >
      <div className="flex justify-start">
        {radio?.map((each: string, index: number) => (
          <RadioButton
            key={index}
            value={value === each}
            onChange={() => handleClick(each)}
            label={each}
          />
        ))}
      </div>
      {value === "Search by name" ? (
        <div className="flex flex-col gap-1">
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
                  <span className="text-[10px] bg-[#F8FAFC] p-[2px_8px_2px_8px] pr-1">
                    {each?.type}
                  </span>
                  <span
                    className={`text-[10px] bg-[#F8FAFC] p-[2px_8px_2px_8px] ${
                      each?.visibility === "public"
                        ? "text-[#039855]"
                        : "text-[#BF8000]"
                    }`}
                  >
                    {each?.visibility}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-4 flex-col">
          <Dropdown
            value={value1!}
            onChange={handleChange1}
            options={dropdownData}
            placeholder="Select service type"
            label="Service type"
          />
          <Dropdown
            value={value2!}
            onChange={handleChange2}
            options={dropdownData1}
            placeholder="Select status type"
            label="Status"
          />
        </div>
      )}
    </div>
  );
};

export default Services;
