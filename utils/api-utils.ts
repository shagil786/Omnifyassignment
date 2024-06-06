import { tableApiProps } from "@/types/types";
import axios from "axios";

export const getTableData = ({ searchText, page, pageSize }: tableApiProps) =>
  axios
    .get(
      `/api/table?searchText=${searchText}${page ? `&page=${page}` : ``}${
        pageSize ? `&pageSize=${pageSize}` : ``
      }`
    )
    .then(({ data }) => data);

export const getHeaderData = () =>
  axios.get(`/api/column`).then(({ data }) => data);

export const peopleSearch = (searchText: any) =>
  axios
    .get(`/api/people?searchText=${searchText ? searchText : ""}`)
    .then(({ data }) => data);

export const serviceSearch = (searchText: any) =>
  axios
    .get(`/api/services?searchText=${searchText ? searchText : ""}`)
    .then(({ data }) => data);
