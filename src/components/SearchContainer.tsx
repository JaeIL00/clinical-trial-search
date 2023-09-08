import { useState, ChangeEvent, useEffect } from 'react';
import '../styles/searchContainerStyle.scss';
import useDebounce from '../hooks/useDebounce';
import useCacheFetch from '../hooks/useCacheFetch';
import SearchResultList from './SearchResultList';
import { DELAY_TIME } from '../constants';

const SearchContainer = () => {
  const { localData, error, isError, cacheOrFetch, remove: localDataReset } = useCacheFetch();

  const [searchText, setSearchText] = useState<string>('');

  const debounceSearchApiCall = useDebounce(cacheOrFetch, DELAY_TIME);

  const changeSearchText = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchText(value);
    localDataReset();

    if (value) debounceSearchApiCall(value);
  };

  const clickBtnSearchApi = () => {
    cacheOrFetch(searchText);
  };

  useEffect(() => {
    if (isError) {
      alert(error);
    }
  }, [isError]);

  return (
    <main className="container">
      <header className="headerStyle">
        <h1>국내 모든 임상시험 검색하고 온라인으로 참여하기</h1>
      </header>
      <section className="inputBox">
        <input type="text" className="inputClass" value={searchText} onChange={changeSearchText} />
        <button type="button" onClick={clickBtnSearchApi}>
          검색
        </button>
      </section>

      <section className="listBox">
        {searchText ? (
          <SearchResultList resultData={localData} />
        ) : (
          <span>검색어를 입력해주세요</span>
        )}
      </section>
    </main>
  );
};

export default SearchContainer;
