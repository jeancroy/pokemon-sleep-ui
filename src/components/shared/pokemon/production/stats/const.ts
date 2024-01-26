import {ProducingStateOfRate} from '@/types/game/producing/state';
import {I18nMessageKeysOfNamespace} from '@/types/i18n';


export const pokemonProducingStatsStateI18nId: {
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
