import { SearchApiResponse } from '../types';
import '../styles/searchResultListStyle.scss';
import { useEffect, useRef, useState } from 'react';
import {
  IDX_PLUS,
  KEYBOARD_ARROW_DOWN,
  KEYBOARD_ARROW_UP,
  KEYBOARD_MOVE_NUMBER,
  LIST_ITEM_HEIGHT,
  MIN_IDX,
} from '../constants';

interface Props {
  resultData: SearchApiResponse | null;
}

const SearchResultList = ({ resultData }: Props) => {
  const listUlRef = useRef<HTMLUListElement>(null);

  const [selectItem, setSelectItem] = useState<number>(0);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (resultData) {
      if (event.key === KEYBOARD_ARROW_UP) {
        setSelectItem((prev) => {
          return prev === MIN_IDX ? MIN_IDX : prev - KEYBOARD_MOVE_NUMBER;
        });
      } else if (event.key === KEYBOARD_ARROW_DOWN) {
        setSelectItem((prev) => {
          return prev === resultData.length ? prev : prev + KEYBOARD_MOVE_NUMBER;
        });
      }
    }
  };

  const moveScroll = () => {
    if (listUlRef.current) {
      listUlRef.current.scrollTop = LIST_ITEM_HEIGHT * selectItem - LIST_ITEM_HEIGHT;
    }
  };

  const initSelectItem = () => {
    setSelectItem(0);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    initSelectItem();
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [resultData]);

  useEffect(moveScroll, [selectItem]);

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
