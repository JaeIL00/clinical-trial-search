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
        const data = cacheStorage[searchText].data;

        return (
            <>
                {data.length > 0 ? (
                    <ul>
                        {cacheStorage[searchText].data.map((result) => (
                            <li key={result.sickCd}>{result.sickNm}</li>
                        ))}
                    </ul>
                ) : (
                    <div>추천 가능한 검색어는 없습니다</div>
                )}
            </>
        );
    }

    return <></>;
};

export default SearchResultList;
