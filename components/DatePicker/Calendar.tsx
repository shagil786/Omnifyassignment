import { calendarProps } from "@/types/types";
import { months, weekdays } from "@/utils/date-utils";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const Calendar: React.FC<calendarProps> = ({
  date,
  onChange,
  myRef,
  min,
  max,
}) => {
  const today = date ?? new Date();
  const year = today?.getFullYear();
  const month = today?.getMonth();
  function isRange(date: Date) {
    return min && max
      ? date >= min && date <= max
      : min
      ? date >= min
      : max
      ? date <= max
      : true;
  }
  let datePicker = [];
  datePicker = React.useMemo(() => {
    let calendarRow: Array<any> = [];
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    let currentWeek = [];
    let currentDay = 1;

    const prevMonth = new Date(year, month, 0).getDate();
    for (let i = 0; i < firstDay?.getDay(); i++) {
      currentWeek.push(
        <td
          key={`empty_${prevMonth - i}`}
          className="p-[6px] text-center cursor-not-allowed text-[#A1A1AA]"
        >
          {prevMonth - i}
        </td>
      );
    }

    while (currentDay <= lastDay.getDate()) {
      const isCurrentValue = currentDay === today?.getDate();
      const currentDate = new Date(year, month, currentDay);
      const isDateRange = isRange(currentDate)

      currentWeek.push(
        <td
          key={`day_${currentDay}`}
          className={`rounded p-[6px] text-center cursor-pointer ${
            isCurrentValue ? "bg-[#18181B] text-white" : ""
          } ${isDateRange ? '' : 'cursor-not-allowed text-[#A1A1AA]'}`}
          onClick={() => onChange(currentDate)}
        >
          {currentDay}
        </td>
      );

      if (currentWeek.length === 7) {
        calendarRow.push(<tr>{currentWeek}</tr>);
        currentWeek = [];
      }
      currentDay++;
    }

    let nextMonth = 1;
    while (currentWeek.length < 7) {
      currentWeek.push(
        <td
          key={`empty_${nextMonth}`}
          className="p-[6px] text-center cursor-not-allowed text-[#A1A1AA]"
        >
          {nextMonth}
        </td>
      );
      nextMonth++;
    }

    calendarRow.push(<tr>{currentWeek}</tr>);

    return calendarRow;
  }, [date, onChange]);

  const calendar = (
    <table>
      <thead>
        <tr>
          {weekdays?.map((each: string, index: number) => (
            <td key={index} className="p-[6px]">
              {each?.slice(0, 2)}
            </td>
          ))}
        </tr>
      </thead>
      <tbody>{datePicker}</tbody>
    </table>
  );

  const handleMove = (dir: "+" | "-") => {
    let date =
      dir === "+"
        ? today?.getMonth() === 0
          ? today?.setFullYear(today?.getFullYear() - 1, 11)
          : today.setMonth(today?.getMonth() - 1)
        : today?.getMonth() === 11
        ? today?.setFullYear(today?.getFullYear() + 1, 0)
        : today?.setMonth(today?.getMonth() + 1);
    onChange(new Date(date));
  };
  return (
    <div
      className="flex flex-col gap-1 absolute bg-white border-[1px] text-[14px] border-[#E4E4E7] search_gradient p-3 rounded-md"
      ref={myRef}
    >
      <div className="flex justify-between items-center">
        <div
          className="cursor-pointer border-[1px] border-[#E4E4E7] box-shadow-[0px_1px_2px_0px_#1018280D] rounded px-3 py-[6px]"
          onClick={() => handleMove("+")}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        {months[today?.getMonth()]}
        <div
          className="cursor-pointer border-[1px] border-[#E4E4E7] box-shadow-[0px_1px_2px_0px_#1018280D] rounded px-3 py-[6px]"
          onClick={() => handleMove("-")}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
      {calendar}
    </div>
  );
};

export default Calendar;
