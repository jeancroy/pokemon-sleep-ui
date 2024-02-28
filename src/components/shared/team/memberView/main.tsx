import React from 'react';

import {Grid} from '@/components/layout/grid';
import {TeamMemberEmptySlot} from '@/components/shared/team/memberView/empty';
import {TeamMemberFilledSlot} from '@/components/shared/team/memberView/filled';
import {
  TeamMemberEmptySlotProps,
  TeamMemberFilledProps,
  TeamMemberViewRequiredData,
} from '@/components/shared/team/memberView/type';
import {UseUserDataActorReturn} from '@/hooks/userData/actor/type';
import {TeamSetupConfig} from '@/types/game/team/config';
import {TeamMemberData, TeamMemberKey} from '@/types/game/team/member';
import {TeamMemberProduction} from '@/types/game/team/production';
import {TeamSetup} from '@/types/game/team/setup';
import {TeamData} from '@/types/game/team/team';
import {toPokemonList} from '@/utils/game/pokemon/utils';
import {getPokemonProducingParams} from '@/utils/game/producing/params';
import {Nullable} from '@/utils/type';


type Props<
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>,
  TConfig extends TeamSetupConfig,
  TTeam extends TeamData<TKey, TMember>,
  TSetup extends TeamSetup<TKey, TMember, TConfig, TTeam>,
> =
  TeamMemberViewRequiredData &
  TeamMemberEmptySlotProps<TKey, TMember> &
  TeamMemberFilledProps<TKey, TMember, TConfig, TTeam, TSetup> & {
    memberKeys: TKey[],
    actorReturn: UseUserDataActorReturn,
    getMemberProduction: (memberKey: TKey) => Nullable<TeamMemberProduction>,
    getTeamMemberFromCloud: (identifier: string) => Promise<Nullable<TMember>>,
    getMemberIdForShare: (currentTeam: TTeam, memberKey: TKey) => string,
    generateKeyForEmptySlot?: () => TKey,
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
  generateKeyForEmptySlot,
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

  const emptySlotKey = React.useMemo(() => {
    if (!generateKeyForEmptySlot) {
      return null;
    }

    let key = generateKeyForEmptySlot();
    while (!!currentTeam.members[key]) {
      key = generateKeyForEmptySlot();
    }

    return key;
  }, [currentTeam.members]);

  const pokemonList = toPokemonList(pokedexMap);

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
            pokemonList={pokemonList}
            memberKey={memberKey}
            sessionStatus={session.status}
            getMemberFromPokeInBox={getMemberFromPokeInBox}
            getMemberFromVanilla={getMemberFromVanilla}
            setCurrentMember={setCurrentMember}
            {...props}
          />
        );
      })}
      {
        emptySlotKey &&
        <TeamMemberEmptySlot
          pokemonList={pokemonList}
          memberKey={emptySlotKey}
          sessionStatus={session.status}
          getMemberFromPokeInBox={getMemberFromPokeInBox}
          getMemberFromVanilla={getMemberFromVanilla}
          setCurrentMember={setCurrentMember}
          {...props}
        />
      }
    </Grid>
  );
};
