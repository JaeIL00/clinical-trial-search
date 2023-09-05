import { useState, ChangeEvent, FormEvent, useCallback } from "react";
import "../styles/InputSearchStyle.css";
import { getSearchResult } from "../api/api";
import useDebounce from "../hooks/useDebounce";

const InputSearchText = () => {
    const [searchText, setSearchText] = useState<string>("");

    const changeSearchText = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchText(value);
        debounceSearchApiCall();
    };

    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        callSearchApi();
    };

    const callSearchApi = async () => {
        await getSearchResult(searchText).then((res) => {
            console.log(res);
        });
    };

    const debounceSearchApiCall = useDebounce(callSearchApi, 500);

    return (
        <form onSubmit={submitHandler}>
            <input type="text" value={searchText} onChange={changeSearchText} />
            <input type="submit" />
        </form>
    );
};

export default InputSearchText;
