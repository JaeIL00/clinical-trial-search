import { useContext, useState } from "react";
import { CacheContext } from "../provider/CacheProvider";
import { getSearchResult } from "../api/api";

const CACHE_TIME = 100000;
const SEARCH_CRITERIA_REG = /^[ㄱ-ㅎa-zA-Z0-9]+$/;

const useCacheSearchFetch = () => {
    const cacheContext = useContext(CacheContext);

    const [isFetching, setIsFetching] = useState<boolean>(false);

    const fetch = async (deadDate: number, searchText: string) => {
        await getSearchResult(searchText)
            .then(({ data }) => {
                cacheContext.updateCache(searchText, { data, deadDate });
                console.log("fetch", data);
            })
            .catch((error) => alert(error))
            .finally(() => setIsFetching(false));
    };

    const dataExist = (
        nowDate: number,
        deadDate: number,
        searchText: string
    ) => {
        const prevDate = cacheContext.cacheStorage[searchText].deadDate;
        const needFetch = nowDate > prevDate;

        if (needFetch) fetch(deadDate, searchText);
        else {
            console.log("캐싱데이터", cacheContext.cacheStorage);
            setIsFetching(false);
        }
    };

    const cacheFetch = (searchText: string) => {
        const reg = new RegExp(SEARCH_CRITERIA_REG);
        const stopSearch = reg.test(searchText);
        if (stopSearch) return;

        setIsFetching(true);

        const isExist = cacheContext.cacheStorage[searchText];
        const nowDate = new Date().getTime();
        const deadDate = nowDate + CACHE_TIME;

        if (isExist) {
            dataExist(nowDate, deadDate, searchText);
        } else {
            fetch(deadDate, searchText);
        }
    };

    return { cacheFetch, isFetching };
};

export default useCacheSearchFetch;
