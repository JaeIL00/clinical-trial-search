import { useContext } from "react";
import { CacheContext } from "../provider/CacheProvider";
import { getSearchResult } from "../api/api";

const useCacheSearchFetch = (searchText: string) => {
    const cacheContext = useContext(CacheContext);

    const cachControl = async () => {
        if (cacheContext.cacheStorage[searchText]) {
            return console.log("캐싱데이터", cacheContext.cacheStorage);
        }

        return await getSearchResult(searchText).then(({ data }) => {
            cacheContext.updateCache(searchText, data);
        });
    };

    return cachControl;
};

export default useCacheSearchFetch;
