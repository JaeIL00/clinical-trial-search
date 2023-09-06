import { useContext, useState } from "react";
import { CacheContext } from "../provider/CacheProvider";
import { getSearchApi } from "../api/api";

interface Params {
    cacheTime: number;
}

const SEARCH_CRITERIA_REG = /^[ㄱ-ㅎa-zA-Z0-9]+$/;

const useCacheSearchFetch = ({ cacheTime }: Params) => {
    const cacheContext = useContext(CacheContext);

    const [isFetching, setIsFetching] = useState<boolean>(false);

    const fetch = async (deadDate: number, searchText: string) => {
        await getSearchApi(searchText)
            .then(({ data }) => {
                cacheContext.updateCache(searchText, { data, deadDate });
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
        else setIsFetching(false);
    };

    const cacheFetch = (searchText: string) => {
        const reg = new RegExp(SEARCH_CRITERIA_REG);
        const stopSearch = reg.test(searchText);
        if (stopSearch) return;

        setIsFetching(true);

        const isExist = cacheContext.cacheStorage[searchText];
        const nowDate = new Date().getTime();
        const deadDate = nowDate + cacheTime;

        if (isExist) {
            dataExist(nowDate, deadDate, searchText);
        } else {
            fetch(deadDate, searchText);
        }
    };

    return { cacheFetch, isFetching };
};

export default useCacheSearchFetch;
