import React from 'react';

import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericIngredientIcon} from '@/components/shared/icon/ingredient';
import {PokemonProducingParamsCommonProps} from '@/components/shared/pokemon/production/params/type';
import {
  getProducingParamsSectionStyle,
  isParamsTrustWorthy,
} from '@/components/shared/pokemon/production/params/utils';
import {formatFloat, formatFloat3} from '@/utils/number/format/regular';


export const PokemonIngredientRate = ({params, noIcon, dimension}: PokemonProducingParamsCommonProps) => {
  const {dataCount, ingredientSplit} = params;

  const t = useTranslations('UI.InPage.Pokedex.Sort');

  return (
    <Flex direction="row" noFullWidth className={getProducingParamsSectionStyle(params)}>
      {!noIcon && <GenericIngredientIcon alt={t('IngredientRate')} dimension={dimension}/>}
      {!isParamsTrustWorthy(dataCount) && <ExclamationTriangleIcon className={dimension}/>}
      <span>
        {formatFloat(ingredientSplit * 100)}%
        (<span className="text-xs">1:</span>{formatFloat3(1 / ingredientSplit)})
      </span>
    </Flex>
  );
};
