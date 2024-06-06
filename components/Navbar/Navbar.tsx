"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "@/public/images/mainIcon.svg";
import { NavbarProps, navProps } from "@/types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightArrowLeft,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import globeIcon from "@/public/images/globe.svg";
import dashboardIcon from "@/public/images/layout-dashboard.svg";
import navigationIcon from "@/public/images/secondary icon.svg";
import profileIcon from "@/public/images/profile.svg";
import helpCircleIcon from "@/public/images/help-circle.svg";
import { useDeveloperData } from "@/utils/appContext";

const Navbar: React.FC<NavbarProps> = ({ width, collapsedWidth, navList }) => {
  const { appData, setAppData } = useDeveloperData();
  const [navSelected, setNavSelected] = useState(0);

  const handleCollapse = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event?.stopPropagation();
    setAppData({ collapse: !appData?.collapse });
  };

  const handleSelect = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    each: navProps
  ) => {
    event?.stopPropagation();
    setNavSelected(each?.id);
  };

  return (
    <div
      className="flex flex-col justify-between h-full"
      style={{
        width: appData?.collapse
          ? collapsedWidth ?? `10vmin`
          : width ?? `42vmin`,
      }}
    >
      <div className={`flex flex-col ${appData?.collapse ? 'px-2' : 'px-6'}`}>
        {/* logo */}
        <div className={`flex items-center cursor-pointer ${appData?.collapse ? 'justify-center' : 'justify-between'} py-6`}>
          <div className="flex items-center gap-2">
            <Image src={logo} alt="logo" onClick={(e) => appData?.collapse ? handleCollapse(e) : null}/>
            <p
              className={`flex items-center justify-center text-[18px] font-[700] leading-6 ${
                appData?.collapse ? `hidden` : ``
              }`}
            >
              Front<span className="px-1">.</span>Desk
            </p>
          </div>
          {appData?.collapse ? null : (
            <div
              className="flex border-[#64748B] border-[1px] border-solid w-[12px] h-[12px] rounded-sm flex justify-end cursor-pointer"
              onClick={handleCollapse}
            >
              <span className="bg-[#64748B] w-[6px]"></span>
            </div>
          )}
        </div>
        {/* sub-nav */}
        <div className="flex flex-col w-full">
          <div
            className={`w-full flex items-center rounded-md bg-white flex ${
              appData?.collapse
                ? `p-2 justify-center`
                : `p-[8px_8px_8px_12px] justify-between`
            } border-[0px_0px_1px_0px] border-[#E2E8F0] shadow-[0px_1px_1px_0px_#64748B0D]`}
          >
            {appData?.collapse ? null : <span>Location</span>}
            <FontAwesomeIcon icon={faArrowRightArrowLeft} />
          </div>
          <div
            className={`${
              appData?.collapse ? "flex justify-center items-center mx-2" : "mx-4"
            } bg-[#F1F5F9] p-[6px_12px_6px_12px] rounded-md gap-1 flex flex-col shadow-[0px_1px_1px_0px_#64748B0D] border_gradient`}
          >
            {appData?.collapse ? null : (
              <p className="leading-5 flex gap-2">
                <span className="font-[700]">08:30 AM</span>
                <span className="font-[500] text-[14px]">Tue 20 Jan</span>
              </p>
            )}
            <div
              className={`flex justify-between items-center text-xs font-[500] leading-4 ${
                appData?.collapse ? "w-[13px] h-[13px]" : ""
              }`}
            >
              <div className="flex gap-1">
                <Image
                  src={globeIcon}
                  alt="globe icon"
                  width={13}
                  height={13}
                />
                {appData?.collapse ? null : <span>UTC: +5 hours</span>}
              </div>
              {appData?.collapse ? null : (
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="text-xs cursor-pointer"
                />
              )}
            </div>
          </div>
        </div>
        {/* nav's */}
        <div className="flex flex-col py-8">
          {navList?.map((each: navProps, index: number) => (
            <div
              className={`flex gap-2 ${appData?.collapse ? 'p-2 justify-center' : 'p-[6px_8px_6px_8px]'} cursor-pointer ${
                navSelected === each?.id
                  ? `bg-white border-[0px_0px_1px_0px] border-[#E2E8F0] shadow-[0px_1px_1px_0px_#64748B0D] rounded-md`
                  : ``
              }`}
              key={`${each?.id}_${index}`}
              onClick={(e) => handleSelect(e, each)}
            >
              <Image src={each?.icon} alt={each?.name} width={16} height={16} />
              {appData?.collapse ? null : (
                <span className="font-[#334155] leading-[20px] font-[500px] text-[14px]">
                  {each?.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* lower nav's */}
      <div className={`flex flex-col ${appData?.collapse ? 'px-2' : 'px-6'} gap-2`}>
        <div className={`flex items-center gap-2 ${appData?.collapse ? 'p-2 justify-center' : 'justify-between p-[6px_8px_6px_8px]'} cursor-pointer`}>
          <div className="flex items-center gap-2">
            {appData?.collapse ? null : (
              <>
                <Image
                  src={dashboardIcon}
                  alt="dashboard"
                  width={16}
                  height={16}
                />
                <span>Dashboard</span>
              </>
            )}
          </div>
          <Image src={navigationIcon} alt="navigation" width={16} height={16} />
        </div>
        <div
          className={`flex items-center ${
            appData?.collapse ? "p-2 justify-center" : "p-[8px_8px_8px_12px] justify-between"
          } w-full rounded-md bg-white border-[0px_0px_1px_0px] border-[#E2E8F0] shadow-[0px_1px_1px_0px_#64748B0D]`}
        >
          <div className="flex gap-2">
            <Image
              src={profileIcon}
              alt="profile_image"
              width={24}
              height={24}
            />
            {appData?.collapse ? null : (
              <div className="flex flex-col gap-2 text-xs">
                <span className="font-[600]">Admin name</span>
                <span className="text-[#64748B] font-[500]">
                  adminname@gamil.com
                </span>
              </div>
            )}
          </div>
          {appData?.collapse ? null : (
            <FontAwesomeIcon
              icon={faChevronDown}
              className="text-xs cursor-pointer"
            />
          )}
        </div>
        <div className={`flex gap-2 items-center cursor-pointer ${appData?.collapse ? 'p-2 justify-center' : 'p-[6px_8px_6px_8px]'}`}>
          <Image
            src={helpCircleIcon}
            alt="profile_image"
            width={20}
            height={20}
          />
          {appData?.collapse ? null : <div className="flex flex-col gap-1 text-xs">
            <span className="font-[600]">Help center</span>
            <span className="text-[#64748B] font-[500] text-[10px]">
              @2024 Omnify.Inc.
            </span>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
