export interface IDates {
  [time: string]: number;
}

export interface ITennis {
  name: string;
  dates: { [date: string]: Array<IDates> };
}

export type IFinderResponse = Array<ITennis>;
