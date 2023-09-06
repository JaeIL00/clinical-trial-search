import { ReactNode, createContext, useRef } from 'react';
import { CacheContextTypes } from '../types';

export const CacheContext = createContext<CacheContextTypes>({
  cacheStorage: {},
  updateCache: () => {},
});

const CacheProvider = ({ children }: { children: ReactNode }) => {
  const cacheStorage = useRef<{ [key: string]: any }>({});

  const updateCache = (key: string, value: any) => {
    cacheStorage.current[key] = value;
  };

  return (
    <CacheContext.Provider value={{ cacheStorage: cacheStorage.current, updateCache }}>
      {children}
    </CacheContext.Provider>
  );
};

export default CacheProvider;
