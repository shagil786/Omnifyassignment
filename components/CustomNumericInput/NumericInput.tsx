import { numericInputProps } from "@/types/types";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent } from "react";

const NumericInput: React.FC<numericInputProps> = ({
  value,
  onChange,
  style,
  min=0,
  max=100
}) => {
    const range = max - min + 1;

  const handleChange = (
    event?: ChangeEvent<HTMLInputElement>,
    dir?: string
  ) => {
    if(event?.target?.value) {
        onChange(event.target?.value);
        return;
    }

    let newValue = (dir === '-' ? value - min + 1 : value - min - 1 + range) % range + min; 
    onChange(newValue);
  };

  return (
    <div className={`${style} bg-[#F8FAFC] p-[4px_12px_4px_12px] flex gap-1 items-center`}>
      <input
        className="bg-[transparent] w-[30px] text-[12px] focus:outline-none"
        name="numeric"
        value={value}
        onChange={(event) => handleChange(event)}
      />
      <div className="flex flex-col z-2">
        <FontAwesomeIcon
          icon={faChevronUp}
          className="top-0 text-[10px]"
          onClick={() => handleChange(undefined, "-")}
        />
        <FontAwesomeIcon
          icon={faChevronDown}
          className="bottom-0 text-[10px]"
          onClick={() => handleChange(undefined, "+")}
        />
      </div>
    </div>
  );
};

export default NumericInput;
