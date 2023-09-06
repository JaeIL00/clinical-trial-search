import { useState, ChangeEvent, FormEvent } from "react";
import "../styles/InputSearchStyle.css";
import useDebounce from "../hooks/useDebounce";
import useCacheSearchFetch from "../hooks/useCacheStorage";
import SearchResultList from "./SearchResultList";

const SearchContainer = () => {
    const [searchText, setSearchText] = useState<string>("");

    const {
        isFetching,
        localData,
        cacheFetch,
        remove: localDataReset,
    } = useCacheSearchFetch({
        cacheTime: 6000,
    });

    const debounceSearchApiCall = useDebounce(cacheFetch, 700);

    const changeSearchText = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchText(value);
        localDataReset();
        if (value) debounceSearchApiCall(value);
    };

    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        cacheFetch(searchText);
    };

    return (
        <main>
            <form onSubmit={submitHandler}>
                <input
                    type="text"
                    value={searchText}
                    onChange={changeSearchText}
                />
                <button type="submit" disabled={isFetching}>
                    {isFetching ? "로딩중" : "검색"}
                </button>
            </form>

            {searchText ? (
                <SearchResultList resultData={localData} />
            ) : (
                <span>검색어를 입력해주세요</span>
            )}
        </main>
    );
};

export default SearchContainer;
