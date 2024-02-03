import {Decimal128} from 'bson';


export type RecipeLevelDataModel = {
  level: number,
  bonus: Decimal128,
  toNext: number,
  accumulated: number,
};

export type RecipeLevelData = Omit<RecipeLevelDataModel, 'bonus'> & {
  bonus: number,
};
