import { useState, ChangeEvent } from "react";
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
    } = useCacheSearchFetch();

    const debounceSearchApiCall = useDebounce(cacheFetch, 700);

    const changeSearchText = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchText(value);
        localDataReset();

        if (value) debounceSearchApiCall(value);
    };

    const clickBtnSearchApi = () => {
        cacheFetch(searchText);
    };

    return (
        <main>
            <section>
                <input
                    type="text"
                    value={searchText}
                    onChange={changeSearchText}
                />
                <button
                    type="button"
                    onClick={clickBtnSearchApi}
                    disabled={isFetching}
                >
                    검색
                </button>
            </section>

            <section>
                {searchText ? (
                    <SearchResultList
                        resultData={localData}
                        isFetching={isFetching}
                    />
                ) : (
                    <span>검색어를 입력해주세요</span>
                )}
            </section>
        </main>
    );
};

export default SearchContainer;
