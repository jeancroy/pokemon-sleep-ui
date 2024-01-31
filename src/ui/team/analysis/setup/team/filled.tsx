import React from 'react';

import {useTranslations} from 'next-intl';

import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {TeamMember} from '@/components/shared/team/member/main';
import {TeamMemberData} from '@/types/game/team';
import {TeamAnalysisSlotName} from '@/types/teamAnalysis';
import {getTeamCompCalcResult} from '@/ui/team/analysis/calc/comp';
import {stateOfRateToShow} from '@/ui/team/analysis/setup/const';
import {TeamAnalysisFilledSlotProps} from '@/ui/team/analysis/setup/team/type';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';
import {getTeamMemberId} from '@/utils/user/teamAnalysis';


type Props = TeamAnalysisDataProps & TeamAnalysisFilledSlotProps;

export const TeamAnalysisFilledSlot = (props: Props) => {
  const {
    setSetup,
    stats,
    currentTeam,
    slotName,
    pokemon,
    showPokemon,
  } = props;

  const t = useTranslations('UI.Metadata.Pokedex');
  const t2 = useTranslations('Game.PokemonName');

  const setTeamMember = (slotName: TeamAnalysisSlotName, update: Partial<TeamMemberData>) => {
    // `merge()` keeps the original value if the `update` is undefined, but `update` should overwrite it
    setSetup((original) => ({
      ...original,
      comps: {
        ...original.comps,
        [original.config.current]: {
          ...original.comps[original.config.current],
          members: {
            ...original.comps[original.config.current].members,
            [slotName]: {
              ...original.comps[original.config.current].members[slotName],
              ...update,
            },
          },
        },
      },
    }));
  };

  return (
    <>
      <button
        className="button-clickable group absolute left-1 top-1 size-6 rounded-full"
        onClick={() => showPokemon(pokemon)}
      >
        <GenericPokeballIcon alt={t('Main.Page.Title', {name: t2(pokemon.id.toString())})} noWrap/>
      </button>
      <TeamMember
        config={currentTeam}
        memberIdForShare={getTeamMemberId({uuid: currentTeam.uuid, slotName})}
        rate={stats}
        stateOfRate={stateOfRateToShow}
        getRate={(level) => getTeamCompCalcResult({
          period: currentTeam.analysisPeriod,
          state: stateOfRateToShow,
          overrideLevel: level,
          ...props,
        }).bySlot[slotName]}
        setMember={(update) => setTeamMember(slotName, update)}
        {...props}
      />
    </>
  );
};
