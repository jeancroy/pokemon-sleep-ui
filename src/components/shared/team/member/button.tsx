import React from 'react';

import LinkIcon from '@heroicons/react/24/outline/LinkIcon';
import {clsx} from 'clsx';

import {AnimatedCollapseQuick} from '@/components/layout/collapsible/animatedQuick';
import {Flex} from '@/components/layout/flex/common';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {IngredientIcons} from '@/components/shared/ingredient/icons/main';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {PokemonName} from '@/components/shared/pokemon/name/main';
import {PokemonNatureIndicator} from '@/components/shared/pokemon/nature/indicator/main';
import {PokemonProductionSplitFromPokemonRate} from '@/components/shared/pokemon/production/split/fromPokemon';
import {PokemonSubSkillIndicator} from '@/components/shared/pokemon/subSkill/indicator';
import {TeamMemberStats} from '@/components/shared/team/member/content/stats';
import {TeamMemberProps} from '@/components/shared/team/member/type';
import {specialtyIdMap} from '@/const/game/pokemon';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {teamMemberStatsType} from '@/types/game/team/statsType';


type Props = TeamMemberProps & {
  isExpanded: boolean,
};

export const TeamMemberCollapsibleButton = ({
  isExpanded,
  ...props
}: Props) => {
  const {
    classOfButton,
    pokemon,
    member,
    teamMetadata,
    rate,
    stateOfRate,
  } = props;
  const {pinnedStats} = teamMetadata;
  const {specialty} = pokemon;
  const {level, subSkill, nature, linkedPokeInBoxUuid} = member;

  const {subSkillMap} = useCommonServerData();

  return (
    <Flex className="gap-1 p-1 pb-5">
      <Flex direction="row" className="items-center justify-between">
        <PokemonName size="xs" pokemon={pokemon} override={member.name}/>
        <Flex direction="row" noFullWidth className="items-end gap-1">
          <span className="text-xs leading-none">Lv</span>
          <span className="text-sm leading-none">{level}</span>
          {linkedPokeInBoxUuid && <LinkIcon className="size-3.5"/>}
        </Flex>
      </Flex>
      <HorizontalSplitter/>
      <Flex className={clsx('items-center gap-2', classOfButton)}>
        <div className="relative size-16 shrink-0">
          <PokemonImage
            pokemonId={pokemon.id}
            image={{type: 'default', image: 'icon'}}
            isShiny={false}
            className="rounded-lg"
          />
        </div>
        <Flex className="items-center justify-between gap-0.5">
          <Flex noFullWidth className={clsx(
            'items-center px-1 py-0.5 text-sm',
            pokemon.specialty === specialtyIdMap.ingredient && 'info-highlight',
          )}>
            <IngredientIcons
              ingredients={[Object.values(member.ingredients).map((production) => production)]}
              dimension="size-5"
              className="gap-0.5"
              noQuantity
              noLink
            />
          </Flex>
          <PokemonSubSkillIndicator
            level={level}
            subSkill={subSkill}
            subSkillMap={subSkillMap}
            className="justify-center"
            dimension="size-5"
          />
          <PokemonNatureIndicator
            nature={nature}
            className="text-sm"
            dimension="size-5"
          />
        </Flex>
      </Flex>
      {teamMemberStatsType.map((type) => (
        <AnimatedCollapseQuick key={type} show={!!pinnedStats[type]}>
          <TeamMemberStats key={type} type={type} {...props}/>
        </AnimatedCollapseQuick>
      ))}
      <PokemonProductionSplitFromPokemonRate
        rate={rate}
        state={stateOfRate}
        specialty={specialty}
        showSummary={isExpanded}
        classBarHeight="h-1.5"
      />
    </Flex>
  );
};
