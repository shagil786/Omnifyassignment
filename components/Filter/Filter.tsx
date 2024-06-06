import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import filterIcon from "@/public/images/filter.svg";
import Modal from "../Modal/Modal";
import Date from "./Date";
import People from "./People";
import Services from "./Services";
import { filterDataProps } from "@/types/types";
import calendarIcon from "@/public/images/calendarFilter.svg";
import userIcon from "@/public/images/users.svg";
import dashboardIcon from "@/public/images/layout-dashboard.svg";
import { useDeveloperData } from "@/utils/appContext";
import { clearStore, getStore, setStore } from "@/utils/storage";

const Filter = () => {
  const [selectedFilter, setSelectedFilter] = useState("Scheduled Date");
  const {appData, setAppData} = useDeveloperData();
  
  const filers: Array<filterDataProps> = [
    {
      name: "Scheduled Date",
      icon: calendarIcon,
      component: <Date />,
    },
    {
      name: "People",
      icon: userIcon,
      component: <People />,
    },
    {
      name: "Services / Products",
      icon: dashboardIcon,
      component: <Services />,
    },
  ];
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow((prev) => !prev);
  };

  const handleApply = () => {
    setStore('filter', appData);
    setShow(prev => !prev)
  }

  const handleReset = () => {
    clearStore();
    setShow(prev => !prev)
  }

  useEffect(() => {
    const data = getStore('filter');
    setAppData(data)
  },[show])

  return (
    <div className="flex gap-1 items-center p-[8px_12px] bg-[#F1F5F9] text-xs rounded cursor-pointer relative">
      <Image src={filterIcon} alt="filter" />
      <span onClick={handleShow}>Add Filter</span>
      <Modal
        isOpen={show}
        setIsOpen={setShow}
        onClose={() => {}}
        isCenter
        style="flex-col w-[42vw] h-[58vh]"
      >
        <div className="flex flex-row h-full">
          <div className="w-[28vmin] flex flex-col gap-1 bg-[#F8FAFC] p-1">
            {filers?.map((each: filterDataProps, index: number) => (
              <div
                className={`flex gap-1 items-center text-xs cursor-pointer p-1 py-2 ${
                  selectedFilter === each?.name ? "rounded bg-[#E2E8F0]" : ""
                }`}
                key={index}
                onClick={() => setSelectedFilter(each?.name)}
              >
                <Image src={each?.icon} alt="icon" width={14} height={14} />
                <span>{each?.name}</span>
              </div>
            ))}
          </div>
          {filers?.map((each: filterDataProps, index: number) => (
            <Fragment key={index}>
              {each?.name === selectedFilter ? each?.component : null}
            </Fragment>
          ))}
        </div>
        <div className="flex justify-end gap-2 text-xs p-2">
          <button className="flex justify-center items-center border-[1px] border-[#E2E8F0] p-1 px-2 rounded-md" onClick={handleReset}>Reset to Default</button>
          <button className="flex justify-center items-center border-[1px] border-[#E2E8F0] bg-[#0F172A] text-white p-1 px-2 rounded-md" onClick={handleApply}>Apply</button>
        </div>
      </Modal>
    </div>
  );
};

export default Filter;
