import React from 'react';

import {useTranslations} from 'next-intl';

import {InputBox} from '@/components/input/box';
import {InputRow} from '@/components/input/filter/row';
import {Flex} from '@/components/layout/flex/common';
import {LevelIcon} from '@/components/shared/icon/lv';
import {GenericMainSkillIcon} from '@/components/shared/icon/mainSkill/generic';
import {GoldSeedIcon} from '@/components/shared/icon/seed/gold';
import {SilverSeedIcon} from '@/components/shared/icon/seed/silver';
import {SeedUsage} from '@/types/game/pokemon/seed';
import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {ReactStateUpdaterFromOriginal} from '@/types/react';
import {getMainSkillLevel} from '@/utils/game/mainSkill/level';


type Props = {
  usage: SeedUsage,
  setUsage: ReactStateUpdaterFromOriginal<SeedUsage>,
  evolutionCount?: number,
  subSkillBonus?: GroupedSubSkillBonus,
};

export const SeedUsageInput = ({
  usage,
  setUsage,
  ...props
}: Props) => {
  const {gold, silver} = usage;

  const t = useTranslations('UI.Common');

  const commonInputStyle = 'items-center gap-1';
  const expectedMainSkillLevel = getMainSkillLevel({
    seedsUsed: gold,
    ...props,
  });

  return (
    <InputRow className="px-2">
      <Flex direction="row" noFullWidth className={commonInputStyle}>
        <GoldSeedIcon/>
        <InputBox
          type="number"
          min={0}
          className="w-20 text-center"
          value={gold.toString()}
          onChange={({target}) => setUsage((original) => ({
            ...original,
            gold: parseInt(target.value || '0'),
          } satisfies SeedUsage))}
        />
      </Flex>
      <Flex direction="row" noFullWidth className={commonInputStyle}>
        <SilverSeedIcon/>
        <InputBox
          type="number"
          min={0}
          className="w-20 text-center"
          value={silver.toString()}
          onChange={({target}) => setUsage((original) => ({
            ...original,
            silver: parseInt(target.value || '0'),
          } satisfies SeedUsage))}
        />
      </Flex>
      <Flex direction="row" noFullWidth center className="ml-auto">
        <GenericMainSkillIcon alt={t('MainSkill')}/>
        <LevelIcon/>
        <div>{expectedMainSkillLevel}</div>
      </Flex>
    </InputRow>
  );
};
