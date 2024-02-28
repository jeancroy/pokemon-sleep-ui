import React from 'react';

import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import {useTranslations} from 'next-intl';

import {InputBox} from '@/components/input/box';
import {Flex} from '@/components/layout/flex/common';
import {StrengthIcon} from '@/components/shared/icon/strength';
import {durationOfDay} from '@/const/common';
import {Production} from '@/types/game/producing/rate/base';
import {TeamAnalysisSnorlaxRank} from '@/ui/team/analysis/setup/summary/rank';
import {TeamFinalEstimateInput} from '@/ui/team/analysis/setup/summary/type';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';
import {toIsoDateString} from '@/utils/date';
import {toProductionOfPeriod} from '@/utils/game/producing/convert';


type Props = Pick<TeamAnalysisDataProps, 'snorlaxData'> & {
  strengthProduction: Production,
};

export const TeamAnalysisFinalEstimate = ({strengthProduction, snorlaxData}: Props) => {
  const t = useTranslations('UI.InPage.Team');

  const [estimateInput, setEstimateInput] = React.useState<TeamFinalEstimateInput>(() => {
    const endsAt = new Date();

    endsAt.setDate(endsAt.getDate() + 7);

    return {
      currentStrength: 0,
      endsAt: `${toIsoDateString(endsAt)}T04:00`,
    };
  });
  const {currentStrength, endsAt} = estimateInput;
  const finalStrength = (
    currentStrength +
    (
      toProductionOfPeriod({rate: strengthProduction, period: 'daily'}).strength *
      (new Date(endsAt).getTime() - Date.now()) /
      (durationOfDay * 1000)
    )
  );

  return (
    <Flex center className="gap-2">
      <Flex direction="row" center wrap className="gap-2">
        <Flex direction="row" center noFullWidth className="gap-1">
          <ClockIcon className="size-6"/>
          <InputBox
            type="datetime-local"
            min={`${toIsoDateString(new Date())}T00:00`}
            className="text-center"
            value={endsAt}
            onChange={({target}) => setEstimateInput((original) => ({
              ...original,
              endsAt: target.value,
            }))}
          />
        </Flex>
        <Flex direction="row" center noFullWidth className="gap-1">
          <StrengthIcon alt={t('CurrentEnergy')} dimension="size-6"/>
          <InputBox
            type="number"
            min={0}
            className="w-20 text-center"
            value={currentStrength.toString()}
            onChange={({target}) => setEstimateInput((original) => ({
              ...original,
              currentStrength: Number(target.value),
            }))}
          />
        </Flex>
      </Flex>
      <TeamAnalysisSnorlaxRank strength={finalStrength} snorlaxData={snorlaxData}/>
    </Flex>
  );
};
