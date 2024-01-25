import {Decimal128} from 'bson';


export type SubSkillId = number;

export type SubSkillRarity = 1 | 2 | 3;

// This corresponds to whatever in the scraper
export type SubSkillBonusBase<TValue> = {
  exp?: TValue, // 14
  helper?: TValue, // 5
  stamina?: TValue, // 1.12
  shard?: TValue, // 6
  research?: TValue, // 6
  frequency?: TValue, // 7 / 14 / 21?
  berryCount?: TValue, // 1 / 2 / 3
  inventory?: TValue, // 6 / 12 / 18
  skillLevel?: TValue, // 1 / 2
  ingredientProbability?: TValue, // 18 / 36 / 54?
  mainSkillProbability?: TValue, // 18 / 36 / 54?
};

export type SubSkillBonusInDatabase = SubSkillBonusBase<Decimal128>;

export type SubSkillBonus = SubSkillBonusBase<number>;

export type SubSkillBonusCategory = keyof Required<SubSkillBonus>;

export type GroupedSubSkillBonus = {[category in SubSkillBonusCategory]?: number[]};

export type SubSkillDataCommon<TBonus> = {
  id: SubSkillId,
  rarity: SubSkillRarity | null,
  next: SubSkillId | null,
  bonus: TBonus,
};

export type SubSkillDataModel = SubSkillDataCommon<SubSkillBonusInDatabase>;

export type SubSkillData = {
  id: SubSkillId,
  rarity: SubSkillRarity | null,
  next: SubSkillId | null,
  bonus: SubSkillBonus,
};

export type SubSkillMap = {[id in SubSkillId]?: SubSkillData};

export const pokemonSubSkillLevel = [
  10,
  25,
  50,
  75,
  100,
] as const;

export type PokemonSubSkillLevel = typeof pokemonSubSkillLevel[number];

export type PokemonSubSkill = {[level in PokemonSubSkillLevel]?: SubSkillId};

export const friendshipLevelsOfGoldLock = [
  0,
  10,
  40,
  100,
] as const;

export type FriendshipLevelOfGoldLock = typeof friendshipLevelsOfGoldLock[number];
