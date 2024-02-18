import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericIcon} from '@/components/shared/icon/common/main';
import {ProducingStateIcon} from '@/components/shared/icon/producingState';
import {
  sleepSessionToProducingStateForNoSkillProbability,
} from '@/components/shared/pokemon/production/noSkill/const';
import {ProducingRateContentCommonProps} from '@/components/shared/production/rate/type';
import {pokemonProducingStateI18nId} from '@/const/game/production';
import {Dimension} from '@/types/style';
import {getNoSkillProbability, GetNoSkillProbabilityOpts} from '@/utils/game/producing/probability/noSkill';
import {formatFloat} from '@/utils/number/format/regular';


type Props = ProducingRateContentCommonProps & GetNoSkillProbabilityOpts;

export const PokemonNoSkillProbability = ({normalSize, ...props}: Props) => {
  const {sleepSession} = props;

  const t = useTranslations('UI.Producing');
  const t2 = useTranslations('UI.Producing.Probability');

  const state = sleepSessionToProducingStateForNoSkillProbability[sleepSession];
  const probability = getNoSkillProbability(props);
  const dimension: Dimension = normalSize ? 'size-5' : 'size-4';

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
