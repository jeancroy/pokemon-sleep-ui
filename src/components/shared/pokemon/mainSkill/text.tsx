import {useTranslations} from 'next-intl';

import {MainSkillLevel} from '@/types/game/pokemon/mainSkill';


type Props = {
  level: MainSkillLevel,
};

export const PokemonMainSkillLevelText = ({level}: Props) => {
  const t = useTranslations('UI.Pokemon.MainSkillLevel');

  if (level === 'max') {
    return t('Max');
  }

  if (level === 'base') {
    return t('Base');
  }

  return level;
};
