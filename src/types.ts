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
