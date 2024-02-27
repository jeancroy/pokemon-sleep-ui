import React from 'react';

import {Grid} from '@/components/layout/grid';
import {
  TeamLayoutControl,
} from '@/components/shared/team/setupControl/layoutControl/type';
import {TeamAnalysisSlotName, teamAnalysisSlotName} from '@/types/teamAnalysis';
import {TeamAnalysisEmptySlot} from '@/ui/team/analysis/setup/team/empty';
import {TeamAnalysisFilledSlot} from '@/ui/team/analysis/setup/team/filled';
import {TeamAnalysisFilledProps} from '@/ui/team/analysis/setup/team/type';
import {toTeamAnalysisMemberFromVanilla} from '@/ui/team/analysis/setup/team/utils';
import {TeamProducingStats} from '@/ui/team/analysis/setup/type';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';
import {getPokemonProducingParams} from '@/utils/game/producing/params';
import {toTeamMember} from '@/utils/team/toMember';


type Props = TeamAnalysisDataProps & TeamAnalysisFilledProps & {
  layoutControl: TeamLayoutControl<TeamAnalysisSlotName>,
  statsOfTeam: TeamProducingStats,
};

export const TeamAnalysisTeamView = ({layoutControl, ...props}: Props) => {
  const {
    currentTeam,
    setupControl,
    pokedexMap,
    pokemonProducingParamsMap,
    ingredientChainMap,
    statsOfTeam,
  } = props;
  const {members} = currentTeam;
  const {generateCollapsibleControl} = layoutControl;
  const {setCurrentMember} = setupControl;

  return (
    <Grid className="grid-cols-1 gap-1.5 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
      {teamAnalysisSlotName.map((slotName) => {
        const member = members[slotName];
        const pokemon = member ? pokedexMap[member.pokemonId] : undefined;
        const stats = statsOfTeam.bySlot[slotName];

        if (member && pokemon && stats) {
          return (
            <TeamAnalysisFilledSlot
              key={slotName}
              slotName={slotName}
              member={member}
              stats={stats}
              pokemon={pokemon}
              pokemonProducingParams={getPokemonProducingParams({
                pokemonId: pokemon.id,
                pokemonProducingParamsMap,
              })}
              onMemberClear={(slotName) => setCurrentMember({key: slotName, member: null})}
              collapsible={generateCollapsibleControl(currentTeam.uuid, slotName)}
              {...props}
            />
          );
        }

        return (
          <TeamAnalysisEmptySlot
            key={slotName}
            onPokeboxPicked={(pokeInBox) => setCurrentMember({
              key: slotName,
              member: toTeamMember(pokeInBox),
            })}
            onCloudPulled={(member) => setCurrentMember({key: slotName, member})}
            onPokemonSelected={(pokemon) => setCurrentMember({
              key: slotName,
              member: toTeamAnalysisMemberFromVanilla({
                pokemon,
                chain: ingredientChainMap[pokemon.ingredientChain],
              }),
            })}
            {...props}
          />
        );
      })}
    </Grid>
  );
};
