import React from 'react';

import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {imageIconSizes} from '@/styles/image';
import {TeamAnalysisSetup} from '@/types/teamAnalysis';
import {TeamAnalysisSetMemberOpts, TeamAnalysisSetupControl} from '@/ui/team/analysis/setup/control/setup/type';
import {getCurrentTeam} from '@/ui/team/analysis/utils';
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

  return {
    setup,
    setSetup,
    setCurrentMember,
    setCurrentMemberPartial: ({slotName, update}) => {
      if (!update) {
        setCurrentMember({slotName, member: null});
        return;
      }

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
    },
  };
};
