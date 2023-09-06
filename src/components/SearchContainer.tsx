import { useState, ChangeEvent, FormEvent } from "react";
import "../styles/InputSearchStyle.css";
import useDebounce from "../hooks/useDebounce";
import useCacheSearchFetch from "../hooks/useCacheStorage";
import SearchResultList from "./SearchResultList";

const SearchContainer = () => {
    const [searchText, setSearchText] = useState<string>("");

    const { cacheFetch, isFetching } = useCacheSearchFetch();

    const changeSearchText = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchText(value);
        if (value) debounceSearchApiCall(value);
    };

    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        cacheFetch(searchText);
    };

    const debounceSearchApiCall = useDebounce(cacheFetch, 700);

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
            <SearchResultList searchText={searchText} />
        </main>
    );
};

export default SearchContainer;