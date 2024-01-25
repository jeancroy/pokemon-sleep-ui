import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {PokemonNatureIndicator} from '@/components/shared/pokemon/nature/indicator/main';
import {PokemonSubSkillIndicator} from '@/components/shared/pokemon/subSkill/indicator';
import {ingredientLevels} from '@/types/game/pokemon/ingredient';
import {RatingRequest} from '@/types/game/pokemon/rating/request';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';


type Props = {
  request: RatingRequest,
  subSkillMap: SubSkillMap,
};

export const RatingResultTarget = ({request, subSkillMap}: Props) => {
  const {pokemon, ingredients, subSkill, nature} = request.setup;

  return (
    <Flex direction="row" className="info-section items-center">
      <div className="relative size-14">
        <PokemonImage pokemonId={pokemon.id} image={{type: 'default', image: 'icon'}} isShiny={false}/>
      </div>
      <Flex center className="gap-1">
        <PokemonIngredientIcons
          ingredients={[[...ingredientLevels].map((level) => ingredients[level])]}
          className="gap-1 text-lg"
          dimension="size-6"
          noLink
        />
        <PokemonSubSkillIndicator subSkill={subSkill} subSkillMap={subSkillMap}/>
        <PokemonNatureIndicator nature={nature}/>
      </Flex>
    </Flex>
  );
};
