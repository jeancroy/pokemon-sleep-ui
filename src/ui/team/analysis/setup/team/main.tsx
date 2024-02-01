import React from 'react';

import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {NextImage} from '@/components/shared/common/image/main';
import {imageIconSizes} from '@/styles/image';
import {TeamAnalysisSetup, teamAnalysisSlotName} from '@/types/teamAnalysis';
import {TeamAnalysisSetupInputControl} from '@/ui/team/analysis/setup/input/type';
import {TeamAnalysisEmptySlot} from '@/ui/team/analysis/setup/team/empty';
import {TeamAnalysisFilledSlot} from '@/ui/team/analysis/setup/team/filled';
import {TeamAnalysisFilledProps, TeamAnalysisSetMemberOpts} from '@/ui/team/analysis/setup/team/type';
import {toTeamAnalysisMemberFromVanilla} from '@/ui/team/analysis/setup/team/utils';
import {TeamProducingStats} from '@/ui/team/analysis/setup/type';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';
import {getCurrentTeam} from '@/ui/team/analysis/utils';
import {getPokemonProducingParams} from '@/utils/game/producing/params';
import {toTeamAnalysisMember} from '@/utils/team/toMember';
import {showToast} from '@/utils/toast';


type Props = TeamAnalysisDataProps & TeamAnalysisFilledProps & {
  inputControl: TeamAnalysisSetupInputControl,
  statsOfTeam: TeamProducingStats,
};

export const TeamAnalysisTeamView = ({inputControl, ...props}: Props) => {
  const {
    currentTeam,
    setSetup,
    pokedexMap,
    pokemonProducingParamsMap,
    ingredientChainMap,
    statsOfTeam,
  } = props;
  const {members} = currentTeam;
  const {generateSlotCollapsibleControl} = inputControl;

  const t = useTranslations('Game');

  const setMember = ({
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
              onMemberClear={(slotName) => setMember({slotName, member: null})}
              collapsible={generateSlotCollapsibleControl(currentTeam.uuid, slotName)}
              {...props}
            />
          );
        }

        return (
          <TeamAnalysisEmptySlot
            key={slotName}
            onPokeboxPicked={(pokeInBox) => setMember({slotName, member: toTeamAnalysisMember(pokeInBox)})}
            onCloudPulled={(member) => setMember({slotName, member})}
            onPokemonSelected={(pokemon) => setMember({
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
