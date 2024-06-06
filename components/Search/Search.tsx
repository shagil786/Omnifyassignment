import { searchProps } from "@/types/types";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Search:React.FC<searchProps> = ({value, placeholder, name, onChange, style}) => {
  return (
    <div className="relative w-full search_gradient rounded-md text-xs" style={style!}>
      <FontAwesomeIcon icon={faSearch} className="absolute px-2 top-0 bottom-0 m-auto"/>
      <input className="w-full h-full border-0 focus:outline-none pl-6 placeholder:text-xs" name={name} type="text" onChange={onChange} placeholder={placeholder} value={value}/>
    </div>
  );
};

export default Search;
