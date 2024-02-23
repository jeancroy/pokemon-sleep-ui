import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericIcon} from '@/components/shared/icon/common/main';
import {ProducingStateIcon} from '@/components/shared/icon/producingState';
import {
  sleepSessionToProducingStateForNoSkillProbability,
} from '@/components/shared/pokemon/production/noSkill/const';
import {ProductionContentCommonProps} from '@/components/shared/production/rate/type';
import {pokemonProducingStateI18nId} from '@/const/game/production/i18n';
import {SleepSession, SleepSessionData} from '@/types/game/sleep';
import {Dimension} from '@/types/style';
import {formatFloat} from '@/utils/number/format/regular';


type Props = ProductionContentCommonProps & {
  noSkillTriggerPercent: SleepSessionData<number | null>,
  sleepSession: SleepSession,
};

export const PokemonNoSkillProbability = ({normalSize, noSkillTriggerPercent, sleepSession}: Props) => {
  const t = useTranslations('UI.Producing');
  const t2 = useTranslations('UI.Producing.Probability');

  const state = sleepSessionToProducingStateForNoSkillProbability[sleepSession];
  const dimension: Dimension = normalSize ? 'size-5' : 'size-4';
  const probability = noSkillTriggerPercent[sleepSession];

  return (
    <Flex noFullWidth direction="row" className={clsx('items-center gap-0.5', !normalSize && 'text-sm')}>
      <ProducingStateIcon state={state} alt={t(pokemonProducingStateI18nId[state])} dimension={dimension}/>
      <GenericIcon
        src="/images/generic/mainSkillSlash.png"
        alt={t2('NoSkillAfterWakeup')}
        dimension={dimension}
      />
      <div>{probability ? formatFloat(probability * 100) : '-'}%</div>
    </Flex>
  );
};
