import React from 'react';

import {Grid} from '@/components/layout/grid';
import {teamAnalysisSlotName} from '@/types/teamAnalysis';
import {TeamAnalysisLayoutControl} from '@/ui/team/analysis/setup/control/setup/layoutControl/type';
import {TeamAnalysisEmptySlot} from '@/ui/team/analysis/setup/team/empty';
import {TeamAnalysisFilledSlot} from '@/ui/team/analysis/setup/team/filled';
import {TeamAnalysisFilledProps} from '@/ui/team/analysis/setup/team/type';
import {toTeamAnalysisMemberFromVanilla} from '@/ui/team/analysis/setup/team/utils';
import {TeamProducingStats} from '@/ui/team/analysis/setup/type';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';
import {getPokemonProducingParams} from '@/utils/game/producing/params';
import {toTeamMember} from '@/utils/team/toMember';


type Props = TeamAnalysisDataProps & TeamAnalysisFilledProps & {
  layoutControl: TeamAnalysisLayoutControl,
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
  const {generateSlotCollapsibleControl} = layoutControl;
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
              onMemberClear={(slotName) => setCurrentMember({slotName, member: null})}
              collapsible={generateSlotCollapsibleControl(currentTeam.uuid, slotName)}
              {...props}
            />
          );
        }

        return (
          <TeamAnalysisEmptySlot
            key={slotName}
            onPokeboxPicked={(pokeInBox) => setCurrentMember({
              slotName,
              member: toTeamMember(pokeInBox),
            })}
            onCloudPulled={(member) => setCurrentMember({slotName, member})}
            onPokemonSelected={(pokemon) => setCurrentMember({
              slotName,
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
