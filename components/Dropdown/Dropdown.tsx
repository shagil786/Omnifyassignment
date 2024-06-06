import { dropdownProps, optionsProps } from "@/types/types";
import useOutsideClick from "@/utils/useOutsideClick";
import { faCheck, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";

const Dropdown: React.FC<dropdownProps> = ({
  value,
  options,
  onChange,
  style,
  label,
  placeholder
}) => {
  const dropdownRef = useRef(null);
  const [show, setShow] = useState(false);

  const isClickOutside = useOutsideClick(dropdownRef)

  useEffect(() => {
    if(isClickOutside)
      setShow(false)
  },[isClickOutside])

  return (
    <div className={`flex flex-col ${style}`}>
      <label className="text-[10px]" htmlFor={label}>
        {label}
      </label>
      <div
        className="relative py-2 text-xs w-full search_gradient rounded-md text-xs"
        id={label}
        onClick={() => setShow(prev => !prev)}
        ref={dropdownRef}
      >
        <span className="px-2 text-[#64748B]">{value?.name ?? value ?? placeholder}</span>
        {show ? <div className="absolute mt-3 bg-white z-[2] flex flex-col gap-2 w-full rounded-b-md p-2 search_gradient">
          {options?.map((each: optionsProps, index: number) => (
            <div key={index} className="flex justify-between items-center cursor-pointer" onClick={() => onChange(each)}>
              <span className="">
                {each?.name}
              </span>
              {value?.id === each?.id ? (
                <FontAwesomeIcon icon={faCheck} />
              ) : null}
            </div>
          ))}
        </div> : null}
        <FontAwesomeIcon icon={faChevronDown} className="absolute right-2 top-0 bottom-0 m-auto text-[#64748B]"/>
      </div>
    </div>
  );
};

export default Dropdown;
