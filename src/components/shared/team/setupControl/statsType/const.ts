import {TeamMemberStatsType} from '@/types/game/team/statsType';
import {I18nMessageKeysOfNamespace} from '@/types/i18n';


export const teamMemberStatsTypeI18nId: {
  [type in TeamMemberStatsType]: I18nMessageKeysOfNamespace<'UI.Component.Team.SetupControl.StatsType'>
} = {
  total: 'Total',
  berry: 'Berry',
  ingredient: 'Ingredient',
  cooking: 'Cooking',
  skill: 'Skill',
  frequency: 'Frequency',
  energy: 'Energy',
  inventory: 'Inventory',
};
