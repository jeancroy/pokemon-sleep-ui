import {GameFeature} from '@/types/game/progress';
import {I18nMessageKeysOfNamespace} from '@/types/i18n';


export const gameFeatureI18nId: {
  [feature in GameFeature]: I18nMessageKeysOfNamespace<'UI.Game.Feature'>
} = {
  levelUp: 'LevelUp',
  cookRecipe: 'CookRecipe',
  potExpand: 'PotExpand',
};
