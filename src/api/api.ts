import axios from "axios";

const axiosInstace = axios.create({
    baseURL: "http://localhost:4000/",
});

export const getSearchResult = async (searchText: string) => {
    console.info("calling api");

    return await axiosInstace(`/sick?q=${searchText}`, {
        method: "get",
    });
};
