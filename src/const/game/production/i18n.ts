import {ProductionPeriod} from '@/types/game/producing/display';
import {ProducingStateCalculated} from '@/types/game/producing/state';
import {I18nMessageKeysOfNamespace} from '@/types/i18n';


export const productionPeriodI18nId: {
  [period in ProductionPeriod]: I18nMessageKeysOfNamespace<'UI.InPage.Pokedex.Stats.Energy'>
} = {
  daily: 'Daily',
  weekly: 'Weekly',
};

export const pokemonProducingStateI18nId: {
  [state in ProducingStateCalculated]: I18nMessageKeysOfNamespace<'UI.Producing'>
} = {
  awake: 'State.Awake',
  sleep1Vacant: 'State.Asleep.Primary.Vacant',
  sleep1Filled: 'State.Asleep.Primary.Filled',
  sleep2Vacant: 'State.Asleep.Secondary.Vacant',
  sleep2Filled: 'State.Asleep.Secondary.Filled',
  equivalent: 'Total',
  unfilledOnly: 'Preset.UnfilledOnly',
};
