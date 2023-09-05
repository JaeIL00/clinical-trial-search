import { useState, ChangeEvent, FormEvent } from "react";
import "../styles/InputSearchStyle.css";

const InputSearchText = () => {
    const [searchText, setSearchText] = useState<string>("");

    const changeSearchText = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchText(value);
    };

    const callSearchApi = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <form onSubmit={callSearchApi}>
            <input type="text" value={searchText} onChange={changeSearchText} />
            <input type="submit" />
        </form>
    );
};

export default InputSearchText;
