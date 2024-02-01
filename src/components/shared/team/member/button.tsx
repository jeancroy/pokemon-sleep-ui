import React from 'react';

import {clsx} from 'clsx';

import {InfoIcon} from '@/components/icons/info';
import {Flex} from '@/components/layout/flex/common';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {PokemonNatureIndicator} from '@/components/shared/pokemon/nature/indicator/main';
import {PokemonProductionSplitFromPokemonRate} from '@/components/shared/pokemon/production/split/fromPokemon';
import {PokemonSubSkillIndicator} from '@/components/shared/pokemon/subSkill/indicator';
import {ProducingRateUI} from '@/components/shared/production/rate/main';
import {TeamMemberProps} from '@/components/shared/team/member/type';
import {specialtyIdMap} from '@/const/game/pokemon';


type Props = TeamMemberProps & {
  isExpanded: boolean,
};

export const TeamMemberCollapsibleButton = ({
  subSkillMap,
  classOfButton,
  pokemon,
  member,
  rate,
  stateOfRate,
  isExpanded,
}: Props) => {
  const {specialty} = pokemon;
  const {total} = rate;
  const {level, subSkill, nature} = member;

  return (
    <Flex className="gap-1 p-1 pb-5">
      <Flex className={clsx('items-center gap-2', classOfButton)}>
        <div className="relative size-16 shrink-0">
          <PokemonImage
            pokemonId={pokemon.id}
            image={{type: 'default', image: 'icon'}}
            isShiny={false}
            className="rounded-lg"
          />
          <InfoIcon className="absolute bottom-0 right-0">
            {level}
          </InfoIcon>
        </div>
        <Flex className="items-center justify-between gap-0.5">
          <Flex noFullWidth className={clsx(
            'items-center px-1 py-0.5 text-sm',
            pokemon.specialty === specialtyIdMap.ingredient && 'info-highlight',
          )}>
            <PokemonIngredientIcons
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
      <ProducingRateUI rate={total} hideQuantity normalSize className="self-center"/>
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
