import React from 'react';

import {useTranslations} from 'next-intl';

import {GenericIconLarger} from '@/components/shared/icon/common/larger';
import {mainSkillEffectTargetI18nId, mainSkillEffectTargetImageSrc} from '@/const/game/mainSkill';
import {MainSkillTarget} from '@/types/game/pokemon/mainSkill';


type Props = {
  target: MainSkillTarget,
};

export const MainSkillTargetIcon = ({target}: Props) => {
  const t = useTranslations('UI.MainSkill.Target');

  return (
    <GenericIconLarger
      src={mainSkillEffectTargetImageSrc[target]}
      alt={t(mainSkillEffectTargetI18nId[target])}
    />
  );
};
