import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {MainSkillTriggerValueIcon} from '@/components/shared/pokemon/mainSkill/icon/trigger';
import {formatFloat} from '@/utils/number/format/regular';


type Props = {
  value: number,
};

export const PokemonMainSkillTriggerValue = ({value}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex.Stats');

  return (
    <Flex direction="row" noFullWidth className="items-center gap-1">
      <MainSkillTriggerValueIcon alt={t('MainSkillTriggerValue')}/>
      <div>{formatFloat(value)}</div>
    </Flex>
  );
};
