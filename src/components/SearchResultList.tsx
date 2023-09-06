import { SearchApiResponse } from "../types";

interface Props {
    resultData: SearchApiResponse | null;
    isFetching: boolean;
}

const SearchResultList = ({ resultData, isFetching }: Props) => {
    if (isFetching) return <span>로딩 중....</span>;

    if (resultData)
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

    return <></>;
};

export default SearchResultList;
