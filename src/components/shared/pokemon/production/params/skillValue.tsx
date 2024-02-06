import React from 'react';

import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericMainSkillIcon} from '@/components/shared/pokemon/mainSkill/icon/generic';
import {PokemonProducingParamsCommonProps} from '@/components/shared/pokemon/production/params/type';
import {
  getProducingParamsSectionStyle,
  isParamsTrustWorthy,
} from '@/components/shared/pokemon/production/params/utils';
import {formatFloat3} from '@/utils/number/format/regular';


export const PokemonMainSkillValue = ({params, noIcon, dimension}: PokemonProducingParamsCommonProps) => {
  const {dataCount, skillValue} = params;

  const t = useTranslations('UI.InPage.Pokedex.Stats');

  return (
    <Flex direction="row" noFullWidth className={getProducingParamsSectionStyle(params)}>
      {!noIcon && <GenericMainSkillIcon alt={t('MainSkillValue')} dimension={dimension}/>}
      {!isParamsTrustWorthy(dataCount) && <ExclamationTriangleIcon className={dimension}/>}
      <div>{formatFloat3(skillValue)}</div>
    </Flex>
  );
};
