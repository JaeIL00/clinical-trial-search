import { useContext } from "react";
import { CacheContext } from "../provider/CacheProvider";

interface Props {
    searchText: string;
}

interface ResultTypes {
    sickCd: "B21";
    sickNm: "암을 유발한 인체 면역결핍바이러스병";
}

const SearchResultList = ({ searchText }: Props) => {
    const { cacheStorage } = useContext(CacheContext);

    if (cacheStorage[searchText]) {
        return (
            <ul>
                {cacheStorage[searchText].data.map((result: ResultTypes) => (
                    <li key={result.sickCd}>{result.sickNm}</li>
                ))}
            </ul>
        );
    }

    return <div></div>;
};

export default SearchResultList;
