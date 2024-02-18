import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {ProductionPeriod} from '@/types/game/producing/display';
import {ProducingRateSingleParams} from '@/types/game/producing/rate';
import {ProducingStateOfRate} from '@/types/game/producing/state';
import {I18nMessageKeysOfNamespace} from '@/types/i18n';


export const productionMultiplierByPeriod: {[period in ProductionPeriod]: number} = {
  daily: 1,
  weekly: 7,
};

export const productionPeriodI18nId: {
  [period in ProductionPeriod]: I18nMessageKeysOfNamespace<'UI.InPage.Pokedex.Stats.Energy'>
} = {
  daily: 'Daily',
  weekly: 'Weekly',
};

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

export const maxTeamMemberCount = 5;

export const helpingBonusEffectPerStack = 0.05;

export const pokemonProducingStateI18nId: {
  [state in ProducingStateOfRate]: I18nMessageKeysOfNamespace<'UI.Producing'>
} = {
  awake: 'State.Awake',
  sleep1Vacant: 'State.Asleep.Primary.Vacant',
  sleep1Filled: 'State.Asleep.Primary.Filled',
  sleep2Vacant: 'State.Asleep.Secondary.Vacant',
  sleep2Filled: 'State.Asleep.Secondary.Filled',
  equivalent: 'Total',
  unfilledOnly: 'Preset.UnfilledOnly',
};
