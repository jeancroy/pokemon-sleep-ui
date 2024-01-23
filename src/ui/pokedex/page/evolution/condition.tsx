import React from 'react';

import ClockIcon from '@heroicons/react/24/outline/ClockIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericIconLarger} from '@/components/shared/icon/common/larger';
import {GenderIcon} from '@/components/shared/icon/gender';
import {ItemIcon} from '@/components/shared/icon/item';
import {LevelIcon} from '@/components/shared/icon/lv';
import {genderEvolutionTextI18nId} from '@/const/game/gender';
import {genderTextStyle} from '@/styles/game/gender';
import {EvolutionCondition} from '@/types/game/pokemon/evolution';


type Props = {
  condition: EvolutionCondition,
};

export const PokemonEvolutionCondition = ({condition}: Props) => {
  const type = condition.type;

  const t = useTranslations('UI.Common');
  const t2 = useTranslations('Game');
  const t3 = useTranslations('UI.Evolution');
  const t4 = useTranslations('UI.Evolution.Gender');

  if (type === 'level') {
    return (
      <Flex direction="row" className="items-center gap-1">
        <LevelIcon/>
        <div>{condition.level}</div>
      </Flex>
    );
  }

  if (type === 'candy') {
    return (
      <Flex direction="row" className="items-center gap-1">
        <GenericIconLarger src="/images/generic/candy.png" alt={t('Candy')} noInvert/>
        <div>{condition.count}</div>
      </Flex>
    );
  }

  if (type === 'item') {
    const itemName = t2(`Item.${condition.item}`);

    return (
      <Flex direction="row" className="items-center gap-1">
        <ItemIcon itemId={condition.item} alt={itemName} noInvert dimension="h-6 w-6"/>
        <div>{itemName}</div>
      </Flex>
    );
  }

  if (type === 'sleepTime') {
    return (
      <Flex direction="row" className="items-center gap-1">
        <GenericIconLarger src="/images/generic/sleep.png" alt={t3('SleepTime')}/>
        <div>{condition.hours}&nbsp;{t('Hour')}</div>
      </Flex>
    );
  }

  if (type === 'timing') {
    return (
      <Flex direction="row" className="items-center gap-1">
        <ClockIcon className="h-6 w-6"/>
        <div>{condition.startHour}&nbsp;~&nbsp;{condition.endHour}</div>
      </Flex>
    );
  }

  if (type === 'gender') {
    const {gender} = condition;

    const text = t4(genderEvolutionTextI18nId[gender]);

    return (
      <Flex direction="row" className={clsx('items-center gap-1', genderTextStyle[gender])}>
        <GenderIcon gender={gender} alt={text} dimension="h-6 w-6"/>
        <div>{text}</div>
      </Flex>
    );
  }

  console.error(`Unhandled evolution condition type of [${type satisfies never}]`);
};
