import { SearchApiResponse } from '../types';
import '../styles/searchResultListStyle.scss';
import { useEffect, useRef, useState } from 'react';

interface Props {
  resultData: SearchApiResponse | null;
  isFetching: boolean;
}

const KEYBOARD_MOVE_NUMBER = 1;
const IDX_PLUS = 1;

const SearchResultList = ({ resultData, isFetching }: Props) => {
  const listUlRef = useRef<HTMLUListElement>(null);

  const [selectItem, setSelectItem] = useState<number>(0);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (resultData) {
      if (event.key === 'ArrowUp') {
        setSelectItem((prev) => {
          return prev === 1 ? 1 : prev - KEYBOARD_MOVE_NUMBER;
        });
      } else if (event.key === 'ArrowDown') {
        setSelectItem((prev) => {
          return prev === resultData.length ? prev : prev + KEYBOARD_MOVE_NUMBER;
        });
      }
    }
  };

  const moveScroll = () => {
    if (listUlRef.current) {
      listUlRef.current.scrollTop = 40 * selectItem - 40;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    moveScroll();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [resultData, selectItem]);

  if (isFetching) return <span>로딩 중....</span>;

  if (resultData)
    return (
      <ul ref={listUlRef} className="ulBox">
        {resultData.length > 0 ? (
          <>
            {resultData.map((result, idx) => {
              const listIdx = idx + IDX_PLUS;
              return (
                <li
                  key={result.sickCd}
                  className={`listItem ${selectItem === listIdx ? 'selectItem' : ''}`}
                >
                  - {result.sickNm}
                </li>
              );
            })}
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
