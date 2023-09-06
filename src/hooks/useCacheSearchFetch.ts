import { useContext, useState } from 'react';
import { CacheContext } from '../provider/CacheProvider';
import { getSearchApi } from '../api/api';
import { SearchApiResponse } from '../types';

interface ErrorTypes {
  message: string;
  name: string;
  code: string;
}

const SEARCH_CRITERIA_REG = /^[ㄱ-ㅎa-zA-Z0-9]+$/;
const CACHE_TIME = 300000;

const useCacheSearchFetch = () => {
  const { cacheStorage, updateCache } = useContext(CacheContext);

  const [error, setError] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [localData, setLocalData] = useState<SearchApiResponse | null>(null);

  const remove = () => setLocalData(null);

  const fetch = async (deadDate: number, searchText: string) => {
    await getSearchApi(searchText)
      .then(({ data }) => {
        updateCache(searchText, { data, deadDate });
        setLocalData(data);
      })
      .catch((error: ErrorTypes) => {
        setError(error.code);
        setIsError(true);
      })
      .finally(() => setIsFetching(false));
  };

  const checkAvailableCache = async (nowDate: number, deadDate: number, searchText: string) => {
    const prevDate = cacheStorage[searchText].deadDate;
    const needFetch = nowDate > prevDate;

    if (needFetch) await fetch(deadDate, searchText);
    else {
      setLocalData(cacheStorage[searchText].data);
      setIsFetching(false);
    }
  };

  const searchable = (searchText: string) => {
    const reg = new RegExp(SEARCH_CRITERIA_REG);
    return reg.test(searchText);
  };

  const cacheOrFetch = async (searchText: string) => {
    const stopSearch = searchable(searchText);
    if (stopSearch) return setLocalData(null);

    setIsFetching(true);

    const isExist = cacheStorage[searchText];
    const nowDate = new Date().getTime();
    const deadDate = nowDate + CACHE_TIME;

    if (isExist) {
      checkAvailableCache(nowDate, deadDate, searchText);
    } else {
      await fetch(deadDate, searchText);
    }
  };

  return { isFetching, localData, error, isError, cacheOrFetch, remove };
};

export default useCacheSearchFetch;
