import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {PokemonNatureIndicator} from '@/components/shared/pokemon/nature/indicator/main';
import {PokemonSubSkillIndicator} from '@/components/shared/pokemon/subSkill/indicator';
import {specialtyIdMap} from '@/const/game/pokemon';
import {PokeInBoxGridDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/grid/details/type';


export const PokeInBoxGridInfo = (props: PokeInBoxGridDetailsProps) => {
  const {
    pokemon,
    pokeInBox,
    subSkillMap,
  } = props;
  const {specialty} = pokemon;
  const {
    level,
    ingredients,
    nature,
    subSkill,
  } = pokeInBox;

  return (
    <Flex className="gap-1.5">
      <Flex noFullWidth className={clsx(
        'w-fit px-1.5',
        specialty === specialtyIdMap.ingredient && 'info-highlight',
      )}>
        <PokemonIngredientIcons ingredients={[Object.values(ingredients)]} noLink/>
      </Flex>
      <Flex direction="row" noFullWidth className="gap-2">
        <PokemonSubSkillIndicator level={level} subSkill={subSkill} subSkillMap={subSkillMap} dimension="size-5"/>
        <PokemonNatureIndicator nature={nature} hideName dimension="size-5"/>
      </Flex>
    </Flex>
  );
};
