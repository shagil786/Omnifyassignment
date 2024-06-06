import { checkboxProps } from '@/types/types'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Checkbox:React.FC<checkboxProps> = ({checked, onChange, style}) => {

  return (
    <div onClick={onChange} className={`w-[18px] h-[16px] border-[1px] border-[#E5E7EB] rounded-md cursor-pointer relative border-box ${checked ? 'bg-black' : ''} ${style}`}>
        <FontAwesomeIcon icon={faCheck} className={`p-[1px] text-white absolute m-auto h-full w-full ${checked ? 'block' : 'hidden'}`}/>
    </div>
  )
}

export default Checkbox