import { datePickerProps, dateRangeProps } from "@/types/types";
import moment from "moment";
import React, { Fragment, useRef, useState } from "react";
import Calendar from "./Calendar";
import useOutsideClick from "@/utils/useOutsideClick";
import Image from "next/image";
import calenadarIcon from "@/public/images/calendar-days.svg";

const DatePicker: React.FC<datePickerProps> = ({ date, setDate, onChange }) => {
  type DateKeys = keyof dateRangeProps;
  const labels: DateKeys[] = ["from", "to"];
  const [focus, setFocus] = useState("");
  const calendarRef = useRef(null);
  const isClickOutside = useOutsideClick(calendarRef);

  const handleBlur = () => {
    if (isClickOutside) {
      setFocus("");
    }
  };

  return (
    <div className="relative flex gap-4">
      {labels?.map((each: DateKeys, index: number) => (
        <div className="flex flex-col capitalize">
          <label className="w-fit text-[10px]" htmlFor={each}>{each}</label>
          <div
            className="relative w-full search_gradient rounded-md text-xs p-2 z-[1]"
            key={index}
          >
            <Image
              src={calenadarIcon}
              alt="calendar"
              className="absolute top-0 bottom-0 m-auto"
            />
            <input
              name={each}
              value={
                date?.[each] ? moment(date?.[each]).format("DD MMM YYYY") : ""
              }
              id={each}
              placeholder="Pick a date"
              onChange={onChange!}
              onFocus={() => setFocus(each)}
              onBlur={handleBlur}
              className="w-full h-full border-0 focus:outline-none pl-6 placeholder:text-xs placeholder:text-black"
            />
            {each === focus ? (
              <Calendar
                date={date?.[each]}
                onChange={(date: Date) => {
                  setDate((prev: any) => ({
                    ...prev,
                    [each]: date,
                  }));
                  setFocus('')
                }}
                myRef={calendarRef}
                min={each === "to" && date?.from ? new Date(date?.from!) : undefined}
                max={each === "from" && date?.to ? new Date(date?.to!) : undefined}
              />
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DatePicker;
