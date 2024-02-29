import React from 'react';

import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon';
import {useTranslations} from 'next-intl';

import {useFilterPremiumRestrictable} from '@/components/input/filter/common/premium/hook';
import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {useTeamLayoutControl} from '@/components/shared/team/setupControl/layoutControl/hook';
import {
  TeamSetupBatchUpdateMemberOpts,
  TeamSetupControl,
  TeamSetupDuplicatedMember,
} from '@/components/shared/team/setupControl/type';
import {useUserActivation} from '@/hooks/userData/activation';
import {useUserDataActor} from '@/hooks/userData/actor/main';
import {useConfigBundle} from '@/hooks/userData/config/bundle/main';
import {imageIconSizes} from '@/styles/image';
import {TeamSetupConfig} from '@/types/game/team/config';
import {TeamMemberData, TeamMemberKey} from '@/types/game/team/member';
import {TeamSetup} from '@/types/game/team/setup';
import {TeamData} from '@/types/game/team/team';
import {TeamSetupSetMemberOpts} from '@/types/game/team/update';
import {ConfigBundle} from '@/types/userData/config/bundle';
import {ConfigRequiredData} from '@/types/userData/config/data';
import {migrate} from '@/utils/migrate/main';
import {pokeInBoxMigrators} from '@/utils/migrate/pokebox/migrators';
import {getCurrentTeam} from '@/utils/team/setup/getCurrentTeam';
import {updateCurrentTeamMember} from '@/utils/team/setup/updateCurrentMember';
import {toTeamMemberFromPokeInBox} from '@/utils/team/toMember';
import {showToast} from '@/utils/toast';
import {Nullable} from '@/utils/type';
import {toCalculatedConfigBundle} from '@/utils/user/config/bundle';


type UseTeamAnalysisSetupControlOpts<
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>,
  TConfig extends TeamSetupConfig,
  TTeam extends TeamData<TKey, TMember>,
  TSetup extends TeamSetup<TKey, TMember, TConfig, TTeam>,
> = ConfigRequiredData & {
  bundleFromServer: ConfigBundle,
  initialMigratedSetup: TSetup,
  getDuplicatedMember: (currentTeam: TTeam, source: TMember) => TeamSetupDuplicatedMember<TKey, TMember> | null,
  getLayoutCollapsibleIndexKeys: (team: TTeam) => TKey[],
};

export const useTeamSetupControl = <
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>,
  TConfig extends TeamSetupConfig,
  TTeam extends TeamData<TKey, TMember>,
  TSetup extends TeamSetup<TKey, TMember, TConfig, TTeam>,
>({
  bundleFromServer,
  initialMigratedSetup,
  getDuplicatedMember,
  getLayoutCollapsibleIndexKeys,
  ...props
}: UseTeamAnalysisSetupControlOpts<
  TKey,
  TMember,
  TConfig,
  TTeam,
  TSetup
>): TeamSetupControl<TKey, TMember, TConfig, TTeam, TSetup> => {
  const [setup, setSetup] = React.useState(initialMigratedSetup);

  const actorReturn = useUserDataActor();
  const {session} = actorReturn;
  const {isPremium} = useUserActivation(session.data);

  const bundle = useConfigBundle({
    bundle: {
      server: bundleFromServer,
      client: session?.data?.user.preloaded,
    },
    ...props,
  });

  const layoutControl = useTeamLayoutControl({
    setup,
    getLayoutCollapsibleIndexKeys,
  });

  const t = useTranslations('Game');

  const currentTeam: TTeam = getCurrentTeam({setup});

  // Need to memoize to prevent infinite re-render
  const currentCalculatedConfigBundle = React.useMemo(() => toCalculatedConfigBundle({
    override: {
      ...(isPremium && currentTeam.configSource === 'override' ? currentTeam.configOverride : {}),
      snorlaxFavorite: currentTeam.configOverride.snorlaxFavorite,
    },
    ...bundle,
    ...props,
  }), [bundle, currentTeam]);

  const premiumInputControl = useFilterPremiumRestrictable({
    premiumOnly: true,
    session: actorReturn.session.data,
  });

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
    premiumInputControl,
    actorReturn,
    currentTeam,
    currentCalculatedConfigBundle,
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
    setCurrentTeam: (getUpdatedTeam) => setSetup((setup) => {
      const updated = getUpdatedTeam(getCurrentTeam({setup}));

      return {
        ...setup,
        teams: {
          ...setup.teams,
          [updated.uuid]: updated,
        },
      };
    }),
    duplicateMemberToCurrentComp: (sourceKey) => {
      const {members} = currentTeam;

      const duplicatedMember = getDuplicatedMember(currentTeam, members[sourceKey]);
      if (!duplicatedMember) {
        return;
      }

      setCurrentMember(duplicatedMember);
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

        return toTeamMemberFromPokeInBox(migrate({
          original: pokeInBox,
          override: null,
          migrators: pokeInBoxMigrators,
          migrateParams: {},
        }));
      },
    }),
  };
};
