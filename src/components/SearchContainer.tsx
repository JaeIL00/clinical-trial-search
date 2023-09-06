import { useState, ChangeEvent, useEffect } from "react";
import "../styles/searchContainerStyle.scss";
import useDebounce from "../hooks/useDebounce";
import useCacheSearchFetch from "../hooks/useCacheSearchFetch";
import SearchResultList from "./SearchResultList";

const SearchContainer = () => {
    const {
        localData,
        error,
        isFetching,
        isError,
        cacheFetch,
        remove: localDataReset,
    } = useCacheSearchFetch();

    const [searchText, setSearchText] = useState<string>("");

    const debounceSearchApiCall = useDebounce(cacheFetch, 400);

    const changeSearchText = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchText(value);
        localDataReset();

        if (value) debounceSearchApiCall(value);
    };

    const clickBtnSearchApi = () => {
        cacheFetch(searchText);
    };

    useEffect(() => {
        if (isError) {
            alert(error);
        }
    }, [isError]);

    return (
        <main className="container">
            <section className="inputBox">
                <input
                    type="text"
                    className="inputClass"
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

            <section className="listBox">
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
