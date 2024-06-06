import { dateRangeProps } from "@/types/types";

export const months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  export const weekdays: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  export const last30Days = (): dateRangeProps => {
    const to = new Date();
    const from = new Date();
    from.setDate(to.getDate() - 30);
    return { from, to };
  };
  
  export const thisMonth = (): dateRangeProps => {
    const to = new Date();
    const from = new Date(to.getFullYear(), to.getMonth(), 1);
    return { from, to };
  };
  
  export const thisQuarter = (): dateRangeProps => {
    const to = new Date();
    const currentMonth = to.getMonth();
    const quarterStartMonth = currentMonth - (currentMonth % 3);
    const from = new Date(to.getFullYear(), quarterStartMonth, 1);
    return { from, to };
  };
  
  export const twoQuartersAgo = (): dateRangeProps => {
    const to = new Date();
    const currentMonth = to.getMonth();
    const quarterStartMonth = currentMonth - (currentMonth % 3) - 6;
    const from = new Date(to.getFullYear(), quarterStartMonth, 1);
    return { from, to };
  };