import React from 'react';

import {useTranslations} from 'next-intl';

import {GenericIcon} from '@/components/shared/icon/common/main';
import {MainSkillId} from '@/types/game/pokemon/mainSkill';
import {Dimension} from '@/types/style';


type Props = {
  id: MainSkillId,
  dimension?: Dimension,
};

export const MainSkillIcon = ({id, dimension}: Props) => {
  const t = useTranslations('Game');

  return (
    <GenericIcon
      src={`/images/mainSkill/icon/${id}.png`}
      alt={t(`MainSkill.Name.${id}`)}
      dimension={dimension}
      noShrink
    />
  );
};
