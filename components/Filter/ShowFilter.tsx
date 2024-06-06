import { useDeveloperData } from "@/utils/appContext";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React, { Fragment } from "react";

const ShowFilter = () => {
  const { appData, setAppData }: any = useDeveloperData();

  return (
    <div className="flex gap-2 h-full">
      {appData?.dateType?.name && (
        <div className="text-xs bg-[#F8FAFC] h-full m-auto flex items-center gap-2 rounded px-2">
          <span>{appData.dateType?.name}</span>
          <FontAwesomeIcon
            icon={faRemove}
            onClick={() =>
              setAppData((prev: any) => {
                const { dateType, dateRange, ...rest } = prev ?? {};
                return rest;
              })
            }
          />
        </div>
      )}
      {appData?.dateRange?.from && (
        <div className="text-xs bg-[#F8FAFC] h-full m-auto flex items-center gap-2 rounded px-2">
          <span>{moment(appData?.dateRange?.from).format("DD MMM YYYY")}</span>
          <FontAwesomeIcon
            icon={faRemove}
            onClick={() =>
              setAppData((prev: any) => ({
                ...prev,
                dateRange: {
                  ...prev.dateRange,
                  from: undefined,
                },
              }))
            }
          />
        </div>
      )}
      {appData?.dateRange?.to && (
        <div className="text-xs bg-[#F8FAFC] h-full m-auto flex items-center gap-2 rounded px-2">
          <span>{moment(appData?.dateRange?.to).format("DD MMM YYYY")}</span>
          <FontAwesomeIcon
            icon={faRemove}
            onClick={() =>
              setAppData((prev: any) => ({
                ...prev,
                dateRange: {
                  ...prev.dateRange,
                  to: undefined,
                },
              }))
            }
          />
        </div>
      )}
    </div>
  );
};

export default ShowFilter;
