import React from 'react';

import ArrowsPointingInIcon from '@heroicons/react/24/outline/ArrowsPointingInIcon';
import ArrowsPointingOutIcon from '@heroicons/react/24/outline/ArrowsPointingOutIcon';
import {useTranslations} from 'next-intl';

import {FilterTextInput} from '@/components/input/filter/preset/text';
import {InputRow} from '@/components/input/filter/row';
import {FlexButton} from '@/components/layout/flex/button';
import {Flex} from '@/components/layout/flex/common';
import {SnorlaxFavoriteInput} from '@/components/shared/snorlax/favorite';
import {productionStatsPeriodI18nId} from '@/const/game/production';
import {PokemonInfo} from '@/types/game/pokemon';
import {productionPeriod} from '@/types/game/producing/display';
import {TeamAnalysisComp, TeamAnalysisSetup} from '@/types/teamAnalysis';
import {teamAnalysisCollapsibleControlStyle} from '@/ui/team/analysis/setup/input/const';
import {TeamAnalysisSetupInputControl} from '@/ui/team/analysis/setup/input/type';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';
import {getCurrentTeam} from '@/ui/team/analysis/utils';


type Props = TeamAnalysisDataProps & {
  pokemonList: PokemonInfo[],
  currentTeam: TeamAnalysisComp,
  inputControl: TeamAnalysisSetupInputControl,
  setSetup: React.Dispatch<React.SetStateAction<TeamAnalysisSetup>>,
};

export const TeamAnalysisSetupInput = ({currentTeam, inputControl, setSetup, ...props}: Props) => {
  const {setAllCollapsible} = inputControl;

  const t = useTranslations('UI.InPage.Team');
  const t2 = useTranslations('UI.InPage.Pokedex.Stats.Energy');
  const t3 = useTranslations('UI.Component.Collapsible');

  return (
    <Flex className="gap-1">
      <SnorlaxFavoriteInput
        filter={currentTeam}
        setFilter={(getUpdatedTeam) => setSetup((setup) => {
          const updated = getUpdatedTeam(getCurrentTeam({setup}));

          return {
            ...setup,
            comps: {
              ...setup.comps,
              [updated.uuid]: updated,
            },
          };
        })}
        filterKey="snorlaxFavorite"
        {...props}
      />
      <FilterTextInput
        title={t('Analysis.Period')}
        idToText={(period) => t2(productionStatsPeriodI18nId[period])}
        ids={[...productionPeriod]}
        isActive={(period) => period === currentTeam.analysisPeriod}
        onClick={(analysisPeriod) => setSetup((setup) => ({
          ...setup,
          comps: {
            ...setup.comps,
            [currentTeam.uuid]: {
              ...currentTeam,
              analysisPeriod,
            } satisfies TeamAnalysisComp,
          },
        }))}
      />
      <InputRow className="justify-end gap-1.5">
        <FlexButton className={teamAnalysisCollapsibleControlStyle} onClick={() => setAllCollapsible(true)}>
          <ArrowsPointingOutIcon className="size-5"/>
          <span>{t3('ExpandAll')}</span>
        </FlexButton>
        <FlexButton className={teamAnalysisCollapsibleControlStyle} onClick={() => setAllCollapsible(false)}>
          <ArrowsPointingInIcon className="size-5"/>
          <span>{t3('CollapseAll')}</span>
        </FlexButton>
      </InputRow>
    </Flex>
  );
};
