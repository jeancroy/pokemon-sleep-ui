import {ProductionPeriod} from '@/types/game/producing/display';
import {ProducingStateCalculated} from '@/types/game/producing/state';
import {TeamMemberProductionSortingBasis} from '@/types/game/team/production';
import {I18nMessageKeysOfNamespace} from '@/types/i18n';


export const productionPeriodI18nId: {
  [period in ProductionPeriod]: I18nMessageKeysOfNamespace<'UI.Producing.Period'>
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
  base: 'State.Base',
  equivalent: 'Total',
  unfilledOnly: 'Preset.UnfilledOnly',
};

export const teamMemberProductionSortingBasisI18nId: {
  [basis in TeamMemberProductionSortingBasis]: I18nMessageKeysOfNamespace<'UI.Producing.Stats'>
} = {
  totalStrength: 'Strength.Total',
  berryStrength: 'Strength.Berry',
  ingredientStrength: 'Strength.Ingredient',
  mainSkillTriggerCount: 'MainSkill.DailyCount',
  mainSkillTriggerRate: 'MainSkill.TriggerRate',
  frequency: 'Frequency',
  timeToFullPackPrimary: 'TimeToFullPack.Primary',
  timeToFullPackSecondary: 'TimeToFullPack.Secondary',
};
