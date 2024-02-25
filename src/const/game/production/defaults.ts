import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {ProductionCalcBehavior} from '@/types/game/producing/behavior/type';
import {ProductionPeriod} from '@/types/game/producing/display';
import {ProductionSingleParams} from '@/types/game/producing/rate/params';


export const defaultProductionPeriod: ProductionPeriod = 'daily';

export const defaultProductionCalcBehavior: ProductionCalcBehavior = {
  asSingle: false,
};

export const defaultLevel = 30;

export const defaultSubSkillBonus = {};

export const defaultProducingParams: Omit<PokemonProducingParams, 'pokemonId'> = {
  dataCount: NaN,
  ingredientSplit: 0.2,
  skillValue: NaN,
  skillPercent: null,
  error: {
    ingredient: null,
    skill: null,
  },
};

export const defaultNeutralOpts: ProductionSingleParams = {
  subSkillBonus: defaultSubSkillBonus,
  natureId: null,
};
