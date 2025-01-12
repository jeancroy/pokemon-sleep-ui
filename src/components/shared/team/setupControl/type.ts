import React from 'react';

import {UseFilterPremiumRestrictableReturn} from '@/components/input/filter/common/premium/type';
import {TeamLayoutControl} from '@/components/shared/team/setupControl/layoutControl/type';
import {UseUserDataActorReturn} from '@/hooks/userData/actor/type';
import {PokemonInfo} from '@/types/game/pokemon';
import {TeamSetupConfig} from '@/types/game/team/config';
import {TeamMemberData, TeamMemberKey} from '@/types/game/team/member';
import {TeamSetup} from '@/types/game/team/setup';
import {TeamData} from '@/types/game/team/team';
import {TeamSetupSetMemberOpts} from '@/types/game/team/update';
import {CalculatedConfigBundle} from '@/types/userData/config/bundle';
import {Pokebox} from '@/types/userData/pokebox';
import {Nullable} from '@/utils/type';


export type TeamSetupReplaceAllMemberOpts = {
  update: Partial<TeamMemberData>,
};

export type TeamSetupUpdateMemberOpts<TKey extends TeamMemberKey> = {
  key: TKey,
  update: Partial<TeamMemberData> | null,
};

export type TeamSetupControl<
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>,
  TConfig extends TeamSetupConfig,
  TTeam extends TeamData<TKey, TMember>,
  TSetup extends TeamSetup<TKey, TMember, TConfig, TTeam>,
> = {
  setup: TSetup,
  setSetup: React.Dispatch<React.SetStateAction<TSetup>>,
  layoutControl: TeamLayoutControl<TKey>,
  actorReturn: UseUserDataActorReturn,
  premiumInputControl: UseFilterPremiumRestrictableReturn,
  currentTeam: TTeam,
  currentCalculatedConfigBundle: CalculatedConfigBundle,
  setCurrentMember: (opts: TeamSetupSetMemberOpts<TKey, TMember>) => void,
  setCurrentMemberReplaceAll: (opts: TeamSetupReplaceAllMemberOpts) => void,
  setCurrentMemberPartial: (opts: TeamSetupUpdateMemberOpts<TKey>) => void,
  setCurrentTeam: (getUpdatedTeam: (currentTeam: TTeam) => TTeam) => void,
  duplicateMemberToCurrentComp: (sourceKey: TKey) => void,
  updatePokemonFromPokebox: (pokebox: Pokebox) => void,
};

export type TeamSetupControlDataProps = {
  pokemonList: PokemonInfo[],
};

export type TeamSetupBatchUpdateMemberOpts = {
  getUpdatedMember: (member: TeamMemberData) => TeamMemberData,
};

export type TeamSetupDuplicatedMember<TKey extends TeamMemberKey, TMember extends Nullable<TeamMemberData>> = {
  key: TKey,
  member: TMember,
};
