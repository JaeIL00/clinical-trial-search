import { useState, ChangeEvent, FormEvent } from "react";
import "../styles/InputSearchStyle.css";
import useDebounce from "../hooks/useDebounce";
import useCacheSearchFetch from "../hooks/useCacheStorage";

const InputSearchText = () => {
    const [searchText, setSearchText] = useState<string>("");

    const { cacheFetch } = useCacheSearchFetch();

    const changeSearchText = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchText(value);
        debounceSearchApiCall(value);
    };

    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        cacheFetch(searchText);
    };

    const debounceSearchApiCall = useDebounce(cacheFetch, 700);

    return (
        <form onSubmit={submitHandler}>
            <input type="text" value={searchText} onChange={changeSearchText} />
            <input type="submit" />
        </form>
    );
};

export default InputSearchText;
