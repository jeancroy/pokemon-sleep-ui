import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {Flex} from '@/components/layout/flex/common';
import {ProgressBarMulti} from '@/components/progressBar/multi/main';
import {GenericBerryIcon} from '@/components/shared/icon/berry';
import {GenericIngredientIcon} from '@/components/shared/icon/ingredient';
import {GenericMainSkillIcon} from '@/components/shared/icon/mainSkill/generic';
import {PokemonProductionSplitCommonProps} from '@/components/shared/pokemon/production/split/type';
import {specialtyIdMap} from '@/const/game/pokemon';
import {PokemonProductionTotal} from '@/types/game/producing/rate/main';
import {formatInt} from '@/utils/number/format/regular';


type Props = PokemonProductionSplitCommonProps & PokemonProductionTotal;

export const PokemonProductionSplit = ({
  specialty,
  showSummary = true,
  classBarHeight,
  className,
  berry,
  ingredient,
  skill,
}: Props) => {
  const t = useTranslations('UI.Pokemon.Info');

  return (
    <Flex center className={clsx('gap-1', className)}>
      <ProgressBarMulti
        data={[
          {
            value: berry,
            data: {
              isHighlight: specialty === specialtyIdMap.berry,
              icon: <GenericBerryIcon alt={t('Berry')} dimension="size-4"/>,
            },
          },
          {
            value: ingredient,
            data: {
              isHighlight: specialty === specialtyIdMap.ingredient,
              icon: <GenericIngredientIcon alt={t('Ingredient')} dimension="size-4"/>,
            },
          },
          {
            value: skill,
            data: {
              isHighlight: specialty === specialtyIdMap.skill,
              icon: <GenericMainSkillIcon alt={t('MainSkill')} dimension="size-4"/>,
            },
          },
        ]}
        className="gap-0.5"
        classBarHeight={classBarHeight}
        classColors={[
          'bg-green-500',
          'bg-yellow-500',
          'bg-sky-500',
        ]}
        summaryWrap={false}
        renderSummary={({data, percent}) => (
          <AnimatedCollapse show={showSummary} appear noFullWidth className={clsx(
            'flex flex-row items-center gap-0.5 rounded-lg',
            data.isHighlight && 'text-energy',
          )}>
            {data.icon}
            <span className="text-xs">{formatInt(percent)}%</span>
          </AnimatedCollapse>
        )}
      />
    </Flex>
  );
};
