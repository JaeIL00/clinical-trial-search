import axios from 'axios';
import { SearchApiResponse } from '../types';

const axiosInstace = axios.create({
  baseURL: 'http://localhost:4000/',
});

export const getSearchApi = async (searchText: string) => {
  console.info('calling api');

  return await axiosInstace.get<SearchApiResponse>(`/sick?q=${searchText}`);
};
