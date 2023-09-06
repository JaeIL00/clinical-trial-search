import { useContext } from "react";
import { CacheContext } from "../provider/CacheProvider";

interface Props {
    searchText: string;
}

const SearchResultList = ({ searchText }: Props) => {
    const { cacheStorage } = useContext(CacheContext);

    if (cacheStorage[searchText]) {
        const data = cacheStorage[searchText].data;

        return (
            <ul>
                {data.length > 0 ? (
                    <>
                        {cacheStorage[searchText].data.map((result) => (
                            <li key={result.sickCd}>{result.sickNm}</li>
                        ))}
                    </>
                ) : (
                    <li>
                        <span>추천 가능한 검색어는 없습니다</span>
                    </li>
                )}
            </ul>
        );
    }

    return <></>;
};

export default SearchResultList;
