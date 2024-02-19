import React from 'react';

import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import {clsx} from 'clsx';
import {useSession} from 'next-auth/react';
import {useTranslations} from 'next-intl';

import {AdsUnit} from '@/components/ads/main';
import {AnimatedCollapseQuick} from '@/components/layout/collapsible/animatedQuick';
import {Flex} from '@/components/layout/flex/common';
import {LazyLoad} from '@/components/layout/lazyLoad';
import {ProgressBarSingle} from '@/components/progressBar/single';
import {ButtonToStartTheSorcery} from '@/components/shared/common/button/sorcery';
import {CompletionResultUI} from '@/components/shared/completion/main';
import {useConfigBundle} from '@/hooks/userData/config/bundle/main';
import {
  teamMakerCompCountWarningThreshold,
  teamMakerStatusI18nId,
  teamMakerStatusStyle,
} from '@/ui/team/maker/const';
import {useTeamMaker} from '@/ui/team/maker/hook/main';
import {useTeamMakerInput} from '@/ui/team/maker/input/hook';
import {TeamMakerInputUI} from '@/ui/team/maker/input/main';
import {TeamMakerResults} from '@/ui/team/maker/result/main';
import {TeamMakerDataProps} from '@/ui/team/maker/type';
import {isTeamMakerStatusLoading} from '@/ui/team/maker/utils';


export const TeamMakerLoadedClient = (props: TeamMakerDataProps) => {
  const {preloaded} = props;

  const t = useTranslations('UI.InPage.Team.Maker');
  const {data} = useSession();
  const bundle = useConfigBundle({
    bundle: {
      server: preloaded,
      client: data?.user.preloaded,
    },
  });

  const {input, setInput} = useTeamMakerInput({preloaded});
  const {
    state,
    calculateTeam,
    cancelCalculation,
    resultsRef,
  } = useTeamMaker({
    teamCompsToShow: input.teamCompsToShow,
  });

  const {
    status,
    result,
    teamCompsCalculated,
    teamCompsTotal,
    cancel,
  } = state;
  const isLoading = isTeamMakerStatusLoading(status);

  return (
    <Flex className="gap-1.5">
      <TeamMakerInputUI
        input={input}
        setInput={setInput}
        {...props}
      />
      <Flex direction="row" className="gap-1.5">
        <ButtonToStartTheSorcery
          ref={resultsRef}
          onClick={() => calculateTeam({...props, input, bundle})}
          disabled={isLoading}
        />
        {
          isLoading &&
          <button className="button-clickable-alert p-1" disabled={cancel} onClick={cancelCalculation}>
            <XMarkIcon className="size-9"/>
          </button>
        }
      </Flex>
      <AdsUnit/>
      <Flex center className={clsx(
        'transform-smooth rounded-lg p-1 text-lg shadow-border',
        teamMakerStatusStyle[status],
      )}>
        {t(teamMakerStatusI18nId[status])}
      </Flex>
      <AnimatedCollapseQuick show={teamCompsCalculated !== null || teamCompsTotal !== null}>
        <Flex direction="row" className="justify-end gap-1.5">
          <UserGroupIcon className="size-6"/>
          <CompletionResultUI completed={teamCompsCalculated} total={teamCompsTotal}/>
        </Flex>
      </AnimatedCollapseQuick>
      <AnimatedCollapseQuick show={teamCompsCalculated !== null && teamCompsTotal !== null}>
        <ProgressBarSingle percent={(teamCompsCalculated ?? NaN) / (teamCompsTotal ?? NaN) * 100}/>
      </AnimatedCollapseQuick>
      <AnimatedCollapseQuick
        show={teamCompsTotal !== null && teamCompsTotal > teamMakerCompCountWarningThreshold}
        className="button-warn-bg rounded-lg p-1.5"
      >
        {t('CompCountWarning')}
      </AnimatedCollapseQuick>
      <LazyLoad loading={status !== 'calculating' && isLoading}>
        <TeamMakerResults
          result={result}
          input={input}
          {...props}
        />
      </LazyLoad>
    </Flex>
  );
};
