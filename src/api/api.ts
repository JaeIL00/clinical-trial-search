import axios from 'axios';
import { SearchApiResponse } from '../types';
import { BASE_URL, END_POINT } from '../constants';

const axiosInstace = axios.create({
  baseURL: BASE_URL,
});

export const getSearchApi = async (searchText: string) => {
  console.info('calling api');

  return await axiosInstace.get<SearchApiResponse>(`${END_POINT}?q=${searchText}`);
};
