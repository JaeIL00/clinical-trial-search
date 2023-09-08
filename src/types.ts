export type SearchApiResponse = {
  sickCd: string;
  sickNm: string;
}[];

export interface CacheContextTypes {
  cacheStorage: {
    [key: string]: {
      data: SearchApiResponse;
      deadDate: number;
    };
  };
  updateCache: (key: string, value: any) => void;
}

export interface ErrorTypes {
  message: string;
  name: string;
  code: string;
}

export type DelayType = number;
