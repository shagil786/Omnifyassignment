import { editColumnProps, selectedProps } from '@/types/types'
import React, { Fragment } from 'react'
import Checkbox from '../Checkbox/Checkbox'

const EditColumn:React.FC<editColumnProps> = ({selected, options, onChange, onReset, onApply}) => {
    const isSelected = (each: selectedProps) => 
        selected?.find(e => e === each?.id)! >= 0 ? true : false;
    
  return (
    <Fragment>
        <p className='text-[14px] font-[600]'>Edit Columns</p>
        <p className='text-xs'>Select the columns to rearrange</p>
        <div className='flex flex-col gap-2 overflow-auto h-[40vmin]'>
            {options?.map((each: selectedProps, index: number) => (
                <div className='flex gap-2 items-center ' key={index} onClick={() => onChange(each)}>
                    <Checkbox checked={isSelected(each)!} />
                    <span className='rounded-md text-xs p-[6px_12px_6px_12px] border-[1px] border-[#E2E8F0] w-full'>{each?.label}</span>
                </div>
            ))}
        </div>
        <div className='flex justify-between text-xs px-2 gap-2'>
            <button className='w-full flex justify-center items-center border-[1px] border-[#E2E8F0] p-1 rounded-md' onClick={onReset}>Reset to Default</button>
            <button className='w-full flex justify-center items-center border-[1px] border-[#E2E8F0] bg-[#0F172A] text-white p-1 rounded-md' onClick={onApply}>Apply</button>
        </div>
        </Fragment>
  )
}

export default EditColumn