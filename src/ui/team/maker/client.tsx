'use client';
import React from 'react';

import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon';
import {clsx} from 'clsx';
import {useSession} from 'next-auth/react';
import {useTranslations} from 'next-intl';

import {AdsUnit} from '@/components/ads/main';
import {AnimatedCollapseQuick} from '@/components/layout/collapsible/animatedQuick';
import {Flex} from '@/components/layout/flex/common';
import {LazyLoad} from '@/components/layout/lazyLoad';
import {ProgressBar} from '@/components/progressBar';
import {ButtonToStartTheSorcery} from '@/components/shared/common/button/sorcery';
import {CompletionResultUI} from '@/components/shared/completion/main';
import {generatePokemonInputFilter} from '@/components/shared/pokemon/filter/utils';
import {useUserSettings} from '@/hooks/userData/settings';
import {
  teamMakerCompCountWarningThreshold,
  teamMakerStatusI18nId,
  teamMakerStatusStyle,
} from '@/ui/team/maker/const';
import {useTeamMaker} from '@/ui/team/maker/hook/main';
import {TeamMakerInputUI} from '@/ui/team/maker/input';
import {TeamMakerResults} from '@/ui/team/maker/result/main';
import {TeamMakerDataProps, TeamMakerInput} from '@/ui/team/maker/type';
import {isTeamMakerStatusLoading} from '@/ui/team/maker/utils';


export const TeamMakerClient = (props: TeamMakerDataProps) => {
  const {preloaded} = props;

  const t = useTranslations('UI.InPage.Team.Maker');
  const {data} = useSession();
  const settings = useUserSettings({
    server: preloaded.settings,
    client: data?.user.preloaded.settings,
  });
  const [input, setInput] = React.useState<TeamMakerInput>({
    snorlaxFavorite: {},
    pokemon: generatePokemonInputFilter({
      isLevelAgnostic: false,
      defaultPokemonLevel: 1,
    }),
    mealType: preloaded.cooking.mealType,
    recipeLevel: preloaded.cooking.recipeLevel,
    ingredientCount: preloaded.cooking.ingredientCount,
    memberCount: 5,
    previewLevel: null,
    previewFinalEvolution: false,
    target: preloaded.cooking.target,
    showInsufficientIngredients: true,
  });
  const {
    state,
    calculateTeam,
    resultsRef,
  } = useTeamMaker();

  const {
    status,
    result,
    teamCompsCalculated,
    teamCompsTotal,
  } = state;
  const isLoading = isTeamMakerStatusLoading(status);

  return (
    <Flex className="gap-1.5">
      <TeamMakerInputUI
        input={input}
        setInput={setInput}
        {...props}
      />
      <ButtonToStartTheSorcery
        ref={resultsRef}
        onClick={() => calculateTeam({...props, input, settings})}
        disabled={isLoading}
      />
      <AdsUnit/>
      <Flex center className={clsx(
        'transform-smooth rounded-lg p-1 text-lg shadow-border',
        teamMakerStatusStyle[status],
      )}>
        {t(teamMakerStatusI18nId[status])}
      </Flex>
      <AnimatedCollapseQuick show={teamCompsCalculated !== null || teamCompsTotal !== null}>
        <Flex direction="row" className="justify-end gap-1.5">
          <UserGroupIcon className="h-6 w-6"/>
          <CompletionResultUI completed={teamCompsCalculated} total={teamCompsTotal}/>
        </Flex>
      </AnimatedCollapseQuick>
      <AnimatedCollapseQuick show={teamCompsCalculated !== null && teamCompsTotal !== null}>
        <ProgressBar percent={(teamCompsCalculated ?? NaN) / (teamCompsTotal ?? NaN) * 100}/>
      </AnimatedCollapseQuick>
      <AnimatedCollapseQuick
        show={teamCompsTotal !== null && teamCompsTotal > teamMakerCompCountWarningThreshold}
        className="button-warn-bg rounded-lg p-1.5"
      >
        {t('CompCountWarning')}
      </AnimatedCollapseQuick>
      <LazyLoad loading={isLoading}>
        <TeamMakerResults
          result={isLoading ? null : result}
          input={input}
          {...props}
        />
      </LazyLoad>
    </Flex>
  );
};
