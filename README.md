# clinical-trial-search

원티드 프리온보딩 인턴십 3주차 과제

## 개요

[한국 임상 정보](https://clinicaltrialskorea.com/)에 질환명 검색 기능 + 추가적인 성능 향상 위한 기능 구현

## 배포

배포 링크: [https://cute-naiad-48c3cd.netlify.app/](https://cute-naiad-48c3cd.netlify.app/)

## 실행 방법

1. Repository Clone

```
$ git clone https://github.com/JaeIL00/clinical-trial-search.git
```

3. 의존성 패키지 설치

```
npm install
```

4. 클라이언트 서버 실행

```
npm run start
```

2. DB 로컬 서버

```
git clone 제공된 깃헙 레포지토리

npm install

npm start
```

## 요구 사항

1. 로컬 캐싱 구현 (expire time 구현)
2. API 호출 횟수 줄이는 전략 수립
3. 키보드로 추천 검색어 이동

## 구현 기능

1.  [검색창 구현](https://github.com/JaeIL00/clinical-trial-search/blob/main/src/components/SearchContainer.tsx)

    - 검색어 입력시 디바운스 동작하여 커스텀훅 리턴된 `fetch` 함수 호출(400ms)
    - 검색어 입력시 커스텀훅이 리턴하는 data reset

1.  검색어 추천 기능 구현

    - [useCacheFetch](https://github.com/JaeIL00/clinical-trial-search/blob/main/src/hooks/useCacheFetch.ts) 커스텀훅에서 캐시 데이터 Stale한지 판단 및 API Call

      1. 검색이 가능한 문구인지 정규식 검사 구현 (`/^[ㄱ-ㅎa-zA-Z0-9]+$/`)
      1. cacheStorage에 입력한 검색어와 동일한 객체 Key가 있는지 검사 구현
      1. 동일한 검색어라면 함께 저장된 ms단위의 date 값을 현재 시간과 비교하여 stale한 데이터인지 판단
      1. stale하다면 API Call하여 최신 데이터 storage 저장 및 UI 컴포넌트로 전달
      1. UI 컴포넌트로 전달되는 데이터는 useState로 관리하여 리렌더링 유발
      1. 에러 발생 시 UI 컴포넌트로 `error message return` 및 `error message alert`

    - 키보드 방향키로 추천 검색어 선택 가능
      1. `window.addEventListener` keydown 타입 이벤트 등록
      1. Keydown 동작으로 update되는 State 값과 목록 인덱스 값 넘버가 일치하는 요소의 스타일 변화
      1. 선택한 추천 검색어는 화면에서 벗어나지 않도록 Scroll 자동 이동 구현

1.  [캐싱 기능 구현](https://github.com/JaeIL00/clinical-trial-search/blob/main/src/provider/CacheProvider.tsx)
    - 외부 상황에 의존적이지 않고 데이터를 온전히 다루기 위해 브라우저 Storage를 사용하지 않음. `context API` 사용
    - cacheStorage와 updateCache를 담은 `context` 생성
    - cacheStorage는 `useRef` 훅을 사용하여 과도한 리렌더링 방지
    - cache expire time 구현 (현재 5분)

## 기술 스택

- 언어: TypeScript

- 라이브러리
  - react
  - react-router-dom
  - axios
  - sass

## 폴더 구조

```markdown
src
├─ apis
├─ components
├─ constants
├─ hooks
├─ pages
├─ provider
├─ routes
└ styles
```
