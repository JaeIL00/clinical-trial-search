import { useContext, useState } from "react";
import { CacheContext } from "../provider/CacheProvider";
import { getSearchApi } from "../api/api";
import { SearchApiResponse } from "../types";

const SEARCH_CRITERIA_REG = /^[ㄱ-ㅎa-zA-Z0-9]+$/;
const CACHE_TIME = 300000;

const useCacheSearchFetch = () => {
    const { cacheStorage, updateCache } = useContext(CacheContext);

    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [localData, setLocalData] = useState<SearchApiResponse | null>(null);

    const remove = () => setLocalData(null);

    const fetch = async (deadDate: number, searchText: string) => {
        await getSearchApi(searchText)
            .then(({ data }) => {
                updateCache(searchText, { data, deadDate });
                setLocalData(data);
            })
            .catch((error) => alert(error))
            .finally(() => setIsFetching(false));
    };

    const dataExist = async (
        nowDate: number,
        deadDate: number,
        searchText: string
    ) => {
        const prevDate = cacheStorage[searchText].deadDate;
        const needFetch = nowDate > prevDate;

        if (needFetch) await fetch(deadDate, searchText);
        else {
            setLocalData(cacheStorage[searchText].data);
            setIsFetching(false);
        }
    };

    const cacheFetch = async (searchText: string) => {
        const reg = new RegExp(SEARCH_CRITERIA_REG);
        const stopSearch = reg.test(searchText);
        if (stopSearch) return setLocalData(null);

        setIsFetching(true);

        const isExist = cacheStorage[searchText];
        const nowDate = new Date().getTime();
        const deadDate = nowDate + CACHE_TIME;

        if (isExist) {
            dataExist(nowDate, deadDate, searchText);
        } else {
            await fetch(deadDate, searchText);
        }
    };

    return { isFetching, localData, cacheFetch, remove };
};

export default useCacheSearchFetch;
