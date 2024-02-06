import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {MainSkillIcon} from '@/components/shared/pokemon/mainSkill/icon/main';
import {MainSkillTriggerValueIcon} from '@/components/shared/pokemon/mainSkill/icon/trigger';
import {getNumberStyles} from '@/styles/text/number';
import {PokemonInfo} from '@/types/game/pokemon';
import {SkillTriggerAnalysisCalculatedUnit} from '@/ui/team/mainskill/targets/type';
import {formatFloat, formatFloat3} from '@/utils/number/format/regular';


type Props = {
  pokemon: PokemonInfo,
  unit: SkillTriggerAnalysisCalculatedUnit,
};

export const SkillTriggerAnalysisTriggerValue = ({pokemon, unit}: Props) => {
  const {skillTriggerValue, skillTriggerCount} = unit;
  const {actual, ratioToBase} = skillTriggerCount || skillTriggerValue;

  const t = useTranslations('UI.InPage.Pokedex');

  const styleClass = getNumberStyles({num: ratioToBase, base: 1});

  return (
    <Flex noFullWidth center>
      <Flex noFullWidth className={clsx('text-2xl', styleClass)}>
        {formatFloat3(ratioToBase)}x
      </Flex>
      <Flex direction="row" noFullWidth className="gap-1">
        {skillTriggerCount ?
          <MainSkillIcon id={pokemon.skill}/> :
          <MainSkillTriggerValueIcon alt={t('Stats.MainSkillTriggerValue')}/>}
        <div>
          {skillTriggerCount ? `${formatFloat3(actual)}x` : formatFloat(actual)}
        </div>
      </Flex>
    </Flex>
  );
};
