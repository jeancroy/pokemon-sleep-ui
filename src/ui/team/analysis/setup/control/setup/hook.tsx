import React from 'react';

import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {imageIconSizes} from '@/styles/image';
import {TeamAnalysisCompMembers, TeamAnalysisSetup, teamAnalysisSlotName} from '@/types/teamAnalysis';
import {
  TeamAnalysisSetMemberOpts,
  TeamAnalysisSetupControl,
  TeamAnalysisUpdateMemberBatchedOpts,
} from '@/ui/team/analysis/setup/control/setup/type';
import {getCurrentTeam} from '@/ui/team/analysis/utils';
import {migrate} from '@/utils/migrate/main';
import {pokeInBoxMigrators} from '@/utils/migrate/pokebox/migrators';
import {toTeamMember} from '@/utils/team/toMember';
import {showToast} from '@/utils/toast';


type UseTeamAnalysisSetupControlOpts = {
  initialSetup: TeamAnalysisSetup,
};

export const useTeamAnalysisSetupControl = ({
  initialSetup,
}: UseTeamAnalysisSetupControlOpts): TeamAnalysisSetupControl => {
  const [setup, setSetup] = React.useState(initialSetup);

  const t = useTranslations('Game');

  const setCurrentMember = ({
    slotName,
    member,
  }: TeamAnalysisSetMemberOpts) => {
    setSetup((original): TeamAnalysisSetup => ({
      ...original,
      comps: {
        ...original.comps,
        [original.config.current]: getCurrentTeam({
          setup: original,
          overrideSlot: slotName,
          overrideMember: member,
        }),
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
        <div className="self-end text-sm">
            #{member.pokemonId} @ {slotName}
        </div>
      </Flex>
    )});
  };

  const updateTeamMemberBatched = ({
    getUpdatedMember,
  }: TeamAnalysisUpdateMemberBatchedOpts) => setSetup(({
    comps,
    config,
    ...original
  }) => ({
    ...original,
    config,
    comps: {
      ...comps,
      [config.current]: {
        ...comps[config.current],
        members: Object.fromEntries(teamAnalysisSlotName.map((slotName) => {
          const member = comps[config.current].members[slotName];

          if (!member) {
            return [slotName, null];
          }

          return [slotName, getUpdatedMember(member)];
        })) as TeamAnalysisCompMembers,
      },
    },
  }));

  return {
    setup,
    setSetup,
    setCurrentMember,
    setCurrentMemberReplaceAll: ({update}) => updateTeamMemberBatched({
      getUpdatedMember: (member) => ({...member, ...update}),
    }),
    setCurrentMemberPartial: ({slotName, update}) => {
      if (!update) {
        setCurrentMember({slotName, member: null});
        return;
      }

      // `merge()` keeps the original value if the `update` is undefined, but `update` should overwrite it
      setSetup(({comps, config, ...original}) => ({
        ...original,
        config,
        comps: {
          ...comps,
          [config.current]: {
            ...comps[config.current],
            members: {
              ...comps[config.current].members,
              [slotName]: {
                ...comps[config.current].members[slotName],
                ...update,
              },
            },
          },
        },
      }));
    },
    duplicateMemberToCurrentComp: (sourceSlot) => {
      const {members} = getCurrentTeam({setup});

      for (const slotName of teamAnalysisSlotName) {
        if (!!members[slotName]) {
          continue;
        }

        setCurrentMember({slotName, member: members[sourceSlot]});
        return;
      }
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
