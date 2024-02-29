import {TeamConfigSource} from '@/types/game/team/team';
import {I18nMessageKeysOfNamespace} from '@/types/i18n';


export const teamUserConfigSourceI18nId: {
  [source in TeamConfigSource]: I18nMessageKeysOfNamespace<'UI.Component.Team.SetupControl.ConfigSource'>
} = {
  default: 'Default',
  override: 'Override',
};
