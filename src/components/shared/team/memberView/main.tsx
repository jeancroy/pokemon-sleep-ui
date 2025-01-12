import React from 'react';

import {Grid} from '@/components/layout/grid';
import {TeamMemberEmptySlot} from '@/components/shared/team/memberView/empty';
import {TeamMemberFilledSlot} from '@/components/shared/team/memberView/filled';
import {
  TeamMemberCloudPullProps,
  TeamMemberEmptySlotProps,
  TeamMemberFilledProps,
} from '@/components/shared/team/memberView/type';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {UseUserDataActorReturn} from '@/hooks/userData/actor/type';
import {TeamSetupConfig} from '@/types/game/team/config';
import {TeamMemberData, TeamMemberKey} from '@/types/game/team/member';
import {TeamMemberProduction, TeamMemberProductionSorter} from '@/types/game/team/production';
import {TeamSetup} from '@/types/game/team/setup';
import {TeamData} from '@/types/game/team/team';
import {toPokemonList} from '@/utils/game/pokemon/utils';
import {getPokemonProducingParams} from '@/utils/game/producing/params';
import {isNotNullish, Nullable} from '@/utils/type';


type Props<
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>,
  TConfig extends TeamSetupConfig,
  TTeam extends TeamData<TKey, TMember>,
  TSetup extends TeamSetup<TKey, TMember, TConfig, TTeam>,
> =
  TeamMemberCloudPullProps<TKey, TMember> &
  TeamMemberEmptySlotProps<TKey, TMember> &
  TeamMemberFilledProps<TKey, TMember, TConfig, TTeam, TSetup> & {
    memberKeys: TKey[],
    actorReturn: UseUserDataActorReturn,
    // Returning `null` means to show an empty slot while `undefined` means just hide it
    getMemberProduction: (memberKey: TKey) => Nullable<TeamMemberProduction>,
    getMemberIdForShare: (currentTeam: TTeam, memberKey: TKey) => string,
    generateKeyForEmptySlot?: () => TKey,
    productionSorter?: TeamMemberProductionSorter,
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
  productionSorter,
  ...props
}: Props<TKey, TMember, TConfig, TTeam, TSetup>) => {
  const {setupControl} = props;
  const {session} = actorReturn;
  const {layoutControl, currentTeam} = setupControl;
  const {members} = currentTeam;
  const {generateCollapsibleControl} = layoutControl;
  const {setCurrentMember} = setupControl;

  const {pokedexMap, pokemonProducingParamsMap} = useCommonServerData();

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

  let productions = memberKeys
    .map((memberKey) => {
      const stats = getMemberProduction(memberKey);
      // Explicit check if `stats` is `undefined` since `stats` of `null` means to show an empty slot instead
      if (stats === undefined) {
        return null;
      }

      return {memberKey, stats};
    })
    .filter(isNotNullish);

  if (productionSorter) {
    productions = productions.sort((a, b) => {
      if (a.stats && b.stats) {
        return productionSorter(a.stats, b.stats);
      }

      return 0;
    });
  }

  return (
    <Grid className="grid-cols-1 gap-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
      {productions.map(({memberKey, stats}) => {
        const member = members[memberKey];
        const pokemon = member ? pokedexMap[member.pokemonId] : undefined;

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
