import { Position } from "@/utils/getPositions";
import { StaticImageData } from "next/image";
import React, { ChangeEventHandler, Dispatch, MouseEventHandler, MutableRefObject, SetStateAction } from "react";

export interface AppData {
    collapse: boolean;
}

export interface DeveloperDataContextProps {
  appData: AppData | undefined;
  setAppData: Dispatch<SetStateAction<AppData | undefined>>;
}

export interface navProps {
    id: number;
    name: string;
    icon: StaticImageData
}

export interface NavbarProps {
    width?: string | number;
    collapsedWidth?: string | number;
    navList?: Array<navProps>
  }

export interface cardList {
    name: string;
    value: number;
}

export interface filterProps {
    title: string
    icon: StaticImageData;
    style: string;
}

export interface searchProps {
    placeholder: string;
    name: string;
    value: string;
    style?: any;
    onChange?: ChangeEventHandler;
}

export interface dataProps {
    created_on: string;
    player: string;
    status: string;
    email: string;
    player_phone: string;
    services: string;
    scheduled: string;
}

export interface tableProps {
    data: Array<dataProps> | undefined;
    header?: any;
    style?: any;
    loading?: boolean;
    rowsPerPage?: number;
    setRowsPerPage?: React.Dispatch<React.SetStateAction<number>>;
    totalRows?: number;
    currentPage?: number;
    setCurrentPage?: React.Dispatch<React.SetStateAction<number>>;
}

export interface modalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onClose: () => void;
    children: React.ReactNode;
    style?: string;
    isCenter?: boolean;
    myRef?: MutableRefObject<HTMLDivElement | null>;
    position?: Position;
}

export interface tableApiProps {
    searchText?: string;
    page?: number;
    pageSize?: number;
}

export type DebounceFunction<F extends (...args: any[]) => any> = (
    this: ThisParameterType<F>,
    ...args: Parameters<F>
) => void

export interface optionsProps {
    name: string;
    id: number;
    operation?: () => dateRangeProps
}

export interface dropdownProps {
    value: optionsProps;
    options: Array<optionsProps>;
    onChange: any;
    style?: any;
    label?: string;
    placeholder?: string;
}

export interface numericInputProps {
    value: number;
    options?: Array<number>;
    onChange: any;
    style?: string;
    min?: number;
    max?: number;
}

export interface selectedProps {
    id: number;
    name: string;
    label: string;
}

export interface editColumnProps {
    selected: Array<number>;
    options: Array<selectedProps>;
    onChange: (each: selectedProps) => void;
    onReset: () => void;
    onApply: () => void;
}

export interface checkboxProps {
    checked: boolean;
    style?: string;
    onChange?: MouseEventHandler<HTMLDivElement> | undefined;
}

export interface filterDataProps {
    name: string;
    icon: StaticImageData,
    component: React.ReactNode;
}

export interface AnyObject extends Record<string, any> {}
export interface filterData extends Array<AnyObject> {}

export interface dateRangeProps {
    from: Date | null;
    to: Date | null;
}

export interface datePickerProps {
    date: dateRangeProps;
    setDate: React.Dispatch<React.SetStateAction<dateRangeProps>>;
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
}

export interface calendarProps {
    date: Date | null;
    onChange: (date: Date) => void;
    myRef?: MutableRefObject<HTMLDivElement | null>;
    min: Date | undefined;
    max: Date | undefined;
}

export interface radiosButtonProps {
    value: boolean;
    label: string;
    style?: string;
    onChange: MouseEventHandler<HTMLDivElement> | undefined;
}