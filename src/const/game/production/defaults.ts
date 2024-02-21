import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {ProductionPeriod} from '@/types/game/producing/display';
import {ProducingRateSingleParams} from '@/types/game/producing/rate/params';


export const defaultProductionPeriod: ProductionPeriod = 'daily';

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

export const defaultNeutralOpts: ProducingRateSingleParams = {
  subSkillBonus: defaultSubSkillBonus,
  natureId: null,
};
