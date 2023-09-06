import { useContext, useState } from "react";
import { CacheContext } from "../provider/CacheProvider";
import { getSearchApi } from "../api/api";
import { SearchApiResponse } from "../types";

interface Params {
    cacheTime: number;
}

const SEARCH_CRITERIA_REG = /^[ㄱ-ㅎa-zA-Z0-9]+$/;

const useCacheSearchFetch = ({ cacheTime }: Params) => {
    const cacheContext = useContext(CacheContext);

    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [localData, setLocalData] = useState<SearchApiResponse>([]);

    const remove = () => setLocalData([]);

    const fetch = async (deadDate: number, searchText: string) => {
        await getSearchApi(searchText)
            .then(({ data }) => {
                cacheContext.updateCache(searchText, { data, deadDate });
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
        const prevDate = cacheContext.cacheStorage[searchText].deadDate;
        const needFetch = nowDate > prevDate;

        if (needFetch) await fetch(deadDate, searchText);
        else {
            setLocalData(cacheContext.cacheStorage[searchText].data);
            setIsFetching(false);
        }
    };

    const cacheFetch = async (searchText: string) => {
        const reg = new RegExp(SEARCH_CRITERIA_REG);
        const stopSearch = reg.test(searchText);
        if (stopSearch) return setLocalData([]);

        setIsFetching(true);

        const isExist = cacheContext.cacheStorage[searchText];
        const nowDate = new Date().getTime();
        const deadDate = nowDate + cacheTime;

        if (isExist) {
            dataExist(nowDate, deadDate, searchText);
        } else {
            await fetch(deadDate, searchText);
        }
    };

    return { isFetching, localData, cacheFetch, remove };
};

export default useCacheSearchFetch;
