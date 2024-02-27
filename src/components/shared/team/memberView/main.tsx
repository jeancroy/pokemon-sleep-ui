import React from 'react';

import {Grid} from '@/components/layout/grid';
import {TeamMemberEmptySlot} from '@/components/shared/team/memberView/empty';
import {TeamMemberFilledSlot} from '@/components/shared/team/memberView/filled';
import {TeamMemberFilledProps, TeamMemberViewDataProps} from '@/components/shared/team/memberView/type';
import {UseUserDataActorReturn} from '@/hooks/userData/actor/type';
import {PokemonInfo} from '@/types/game/pokemon';
import {TeamSetupConfig} from '@/types/game/team/config';
import {TeamMemberData, TeamMemberKey} from '@/types/game/team/member';
import {TeamMemberProduction} from '@/types/game/team/production';
import {TeamSetup} from '@/types/game/team/setup';
import {TeamData} from '@/types/game/team/team';
import {PokeInBox} from '@/types/userData/pokebox';
import {toPokemonList} from '@/utils/game/pokemon/utils';
import {getPokemonProducingParams} from '@/utils/game/producing/params';
import {Nullable} from '@/utils/type';


type Props<
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>,
  TConfig extends TeamSetupConfig,
  TTeam extends TeamData<TKey, TMember>,
  TSetup extends TeamSetup<TKey, TMember, TConfig, TTeam>,
> =TeamMemberViewDataProps & TeamMemberFilledProps<TKey, TMember, TConfig, TTeam, TSetup> & {
  memberKeys: TKey[],
  actorReturn: UseUserDataActorReturn,
  getMemberProduction: (memberKey: TKey) => Nullable<TeamMemberProduction>,
  getMemberFromVanilla: (pokemon: PokemonInfo) => TMember,
  getMemberFromPokeInBox: (pokeInBox: PokeInBox) => TMember,
  getTeamMemberFromCloud: (identifier: string) => Promise<Nullable<TMember>>,
  getMemberIdForShare: (currentTeam: TTeam, memberKey: TKey) => string,
};

export const TeamMemberView = <
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>,
  TConfig extends TeamSetupConfig,
  TTeam extends TeamData<TKey, TMember>,
  TSetup extends TeamSetup<TKey, TMember, TConfig, TTeam>,
>({
  memberKeys,
  actorReturn,
  getMemberProduction,
  getMemberFromVanilla,
  getMemberFromPokeInBox,
  getMemberIdForShare,
  ...props
}: Props<TKey, TMember, TConfig, TTeam, TSetup>) => {
  const {
    currentTeam,
    setupControl,
    pokedexMap,
    pokemonProducingParamsMap,
  } = props;
  const {session} = actorReturn;
  const {members} = currentTeam;
  const {layoutControl} = setupControl;
  const {generateCollapsibleControl} = layoutControl;
  const {setCurrentMember} = setupControl;

  return (
    <Grid className="grid-cols-1 gap-1.5 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
      {memberKeys.map((memberKey) => {
        const member = members[memberKey];
        const pokemon = member ? pokedexMap[member.pokemonId] : undefined;
        const stats = getMemberProduction(memberKey);

        if (member && pokemon && stats) {
          return (
            <TeamMemberFilledSlot
              key={memberKey}
              member={member}
              memberKey={memberKey}
              memberIdForShare={getMemberIdForShare(currentTeam, memberKey)}
              stats={stats}
              pokemon={pokemon}
              pokemonProducingParams={getPokemonProducingParams({
                pokemonId: pokemon.id,
                pokemonProducingParamsMap,
              })}
              collapsible={generateCollapsibleControl(currentTeam.uuid, memberKey)}
              {...props}
            />
          );
        }

        return (
          <TeamMemberEmptySlot
            key={memberKey}
            onPokeboxPicked={(pokeInBox) => setCurrentMember({
              key: memberKey,
              member: getMemberFromPokeInBox(pokeInBox),
            })}
            onPokemonSelected={(pokemon) => setCurrentMember({
              key: memberKey,
              member: getMemberFromVanilla(pokemon),
            })}
            onCloudPulled={(member) => setCurrentMember({key: memberKey, member})}
            pokemonList={toPokemonList(pokedexMap)}
            sessionStatus={session.status}
            {...props}
          />
        );
      })}
    </Grid>
  );
};
