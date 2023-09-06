import { SearchApiResponse } from "../types";

interface Props {
    resultData: SearchApiResponse;
}

const SearchResultList = ({ resultData }: Props) => {
    return (
        <ul>
            {resultData.length > 0 ? (
                <>
                    {resultData.map((result) => (
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
};

export default SearchResultList;
