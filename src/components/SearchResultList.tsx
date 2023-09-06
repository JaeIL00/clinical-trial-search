import { useContext } from "react";
import { CacheContext } from "../provider/CacheProvider";

interface Props {
    searchText: string;
    isFetching: boolean;
}

const SearchResultList = ({ searchText, isFetching }: Props) => {
    const { cacheStorage } = useContext(CacheContext);

    if (!isFetching && cacheStorage[searchText]) {
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
