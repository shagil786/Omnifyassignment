import React, { useContext, useEffect, useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import { dateRangeProps, optionsProps } from "@/types/types";
import DatePicker from "../DatePicker/DatePicker";
import { last30Days, thisMonth, thisQuarter, twoQuartersAgo } from "@/utils/date-utils";
import { useDeveloperData } from "@/utils/appContext";

const Date = () => {
  const {appData, setAppData}: any = useDeveloperData();
  const [value, setValue] = useState<optionsProps>(appData?.dateType);
  const [dateRange, setDateRange] = useState<dateRangeProps>(appData?.dateRange)
  const handleChange = (each: optionsProps) => {
    setValue(each)
  };
  const dropdownData: Array<optionsProps> = [
    { id: 0, name: "All time" },
    { id: 1, name: "Custom" },
    { id: 2, name: "Last 30 days", operation: last30Days },
    { id: 3, name: "This month", operation: thisMonth},
    { id: 4, name: "This quarter", operation: thisQuarter },
    { id: 5, name: "2 quarter ago", operation: twoQuartersAgo },
  ];

  useEffect(() => {
    setAppData((prev: any) => ({
      ...prev,
      dateType: value
    }))
  },[value]);

  useEffect(() => {
    setAppData((prev: any) => ({
      ...prev,
      dateRange: dateRange
    }))
  },[dateRange?.from, dateRange?.to]);

  return (
    <div className="p-2 flex flex-col gap-4" style={{
      width: 'calc(100% - 28vmin)'
    }}>
      <Dropdown value={value!} onChange={handleChange} options={dropdownData} label="Show orders for" placeholder="Date type"/>
      {value?.name === 'Custom' ? <DatePicker date={dateRange!} setDate={setDateRange}/> : null}
    </div>
  );
};

export default Date;
