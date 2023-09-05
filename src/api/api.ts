import axios from "axios";

const axiosInstace = axios.create({
    baseURL: "http://localhost:4000/",
});

export const getSearchResult = async (searchText: string) => {
    return await axiosInstace(`/sick?q=${searchText}`, {
        method: "get",
    });
};
