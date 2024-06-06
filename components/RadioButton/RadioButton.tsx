import { radiosButtonProps } from "@/types/types";
import React from "react";

const RadioButton: React.FC<radiosButtonProps> = ({
  value,
  label,
  style,
  onChange,
}) => {
  return (
    <div className="flex gap-2 items-center text-xs w-full">
      <div className={`w-4 h-4 border-[1px] border-[#E2E8F0] rounded-xl p-[3px] ${style}`} onClick={onChange}>
        {value ? <div className="bg-black w-full h-full rounded-xl"></div> : null}
      </div>
      <span>{label}</span>
    </div>
  );
};

export default RadioButton;
