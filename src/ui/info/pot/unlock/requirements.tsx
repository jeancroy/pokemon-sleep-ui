import React from 'react';

import CheckCircleIcon from '@heroicons/react/24/outline/CheckCircleIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericIcon} from '@/components/shared/icon/common/main';
import {PotRecipeUnlockCommonProps} from '@/ui/info/pot/unlock/type';
import {formatInt} from '@/utils/number/format/regular';


export const PotRecipeUnlockRequirements = ({
  filter,
  potInfo,
  cumulativeShardsRequirement,
}: PotRecipeUnlockCommonProps) => {
  const {capacity} = filter;

  const t = useTranslations('UI.InPage.Info.Pot');

  if (capacity >= potInfo.capacity) {
    return <CheckCircleIcon className="size-6"/>;
  }

  return (
    <Flex direction="row" center noFullWidth className="gap-1">
      <GenericIcon src="/images/generic/shardWhite.png" alt={t('Expand')} dimension="size-7"/>
      <Flex noFullWidth className="gap-0.5">
        <div>{formatInt(cumulativeShardsRequirement)}</div>
        <div className="text-xs">(+{formatInt(potInfo.cost)})</div>
      </Flex>
    </Flex>
  );
};
