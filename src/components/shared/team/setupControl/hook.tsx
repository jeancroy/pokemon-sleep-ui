import React from 'react';

import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {useTeamLayoutControl} from '@/components/shared/team/setupControl/layoutControl/hook';
import {TeamSetupBatchUpdateMemberOpts, TeamSetupControl} from '@/components/shared/team/setupControl/type';
import {imageIconSizes} from '@/styles/image';
import {TeamSetupConfig} from '@/types/game/team/config';
import {TeamMemberData, TeamMemberKey} from '@/types/game/team/member';
import {TeamSetup} from '@/types/game/team/setup';
import {TeamData} from '@/types/game/team/team';
import {TeamSetupSetMemberOpts} from '@/types/game/team/update';
import {migrate} from '@/utils/migrate/main';
import {pokeInBoxMigrators} from '@/utils/migrate/pokebox/migrators';
import {getCurrentTeam} from '@/utils/team/setup/getCurrentTeam';
import {updateCurrentTeamMember} from '@/utils/team/setup/updateCurrentMember';
import {toTeamMember} from '@/utils/team/toMember';
import {showToast} from '@/utils/toast';
import {Nullable} from '@/utils/type';


type UseTeamAnalysisSetupControlOpts<
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>,
  TConfig extends TeamSetupConfig,
  TTeam extends TeamData<TKey, TMember>,
  TSetup extends TeamSetup<TKey, TMember, TConfig, TTeam>,
> = {
  initialMigratedSetup: TSetup,
  getNextKeyForDuplicate: (currentTeam: TTeam) => TKey | null,
  getLayoutCollapsibleIndexKeys: (team: TTeam) => TKey[],
};

export const useTeamSetupControl = <
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>,
  TConfig extends TeamSetupConfig,
  TTeam extends TeamData<TKey, TMember>,
  TSetup extends TeamSetup<TKey, TMember, TConfig, TTeam>,
>({
  initialMigratedSetup,
  getNextKeyForDuplicate,
  getLayoutCollapsibleIndexKeys,
}: UseTeamAnalysisSetupControlOpts<
  TKey,
  TMember,
  TConfig,
  TTeam,
  TSetup
>): TeamSetupControl<TKey, TMember, TConfig, TTeam, TSetup> => {
  const [setup, setSetup] = React.useState(initialMigratedSetup);

  const layoutControl = useTeamLayoutControl({
    setup,
    getLayoutCollapsibleIndexKeys,
  });

  const t = useTranslations('Game');

  const setCurrentMember = ({key, member}: TeamSetupSetMemberOpts<TKey, TMember>) => {
    setSetup((original): TSetup => ({
      ...original,
      teams: {
        ...original.teams,
        [original.config.current]: getCurrentTeam({setup: original, override: {key, member}}),
      },
    }));

    if (!member) {
      return;
    }

    showToast({content: (
      <Flex direction="row" className="gap-1.5">
        <PlusCircleIcon className="size-9"/>
        <div className="relative size-9">
          <NextImage
            src={`/images/pokemon/icons/${member.pokemonId}.png`} alt={t(`PokemonName.${member.pokemonId}`)}
            sizes={imageIconSizes}
          />
        </div>
        <div className="self-end text-sm">#{member.pokemonId} @ {key}</div>
      </Flex>
    )});
  };

  const updateTeamMemberBatched = ({
    getUpdatedMember,
  }: TeamSetupBatchUpdateMemberOpts) => setSetup((original) => {
    const {teams, config} = original;
    const currentTeam: TTeam = getCurrentTeam({setup});

    return {
      ...original,
      teams: {
        ...teams,
        [config.current]: {
          ...currentTeam,
          members: Object.fromEntries(Object.entries<TMember>(currentTeam.members).map(([memberKey, member]) => {
            if (!member) {
              return [memberKey, null];
            }

            return [memberKey, getUpdatedMember(member)];
          })),
        },
      },
    };
  });

  return {
    setup,
    setSetup,
    layoutControl,
    setCurrentMember,
    setCurrentMemberReplaceAll: ({update}) => updateTeamMemberBatched({
      getUpdatedMember: (member) => ({...member, ...update}),
    }),
    setCurrentMemberPartial: ({key, update}) => {
      if (!update) {
        setCurrentMember({key, member: null});
        return;
      }

      setSetup((original) => updateCurrentTeamMember({
        original,
        key,
        update,
      }));
    },
    duplicateMemberToCurrentComp: (sourceKey) => {
      const currentTeam: TTeam = getCurrentTeam({setup});
      const {members} = currentTeam;

      const key = getNextKeyForDuplicate(currentTeam);

      if (key === null) {
        return;
      }

      setCurrentMember({key, member: members[sourceKey] ?? null});
    },
    updatePokemonFromPokebox: (pokebox) => updateTeamMemberBatched({
      getUpdatedMember: (member) => {
        const {linkedPokeInBoxUuid} = member;
        if (!linkedPokeInBoxUuid) {
          return member;
        }

        const pokeInBox = pokebox[linkedPokeInBoxUuid];
        if (!pokeInBox) {
          return member;
        }

        return toTeamMember(migrate({
          original: pokeInBox,
          override: null,
          migrators: pokeInBoxMigrators,
          migrateParams: {},
        }));
      },
    }),
  };
};
