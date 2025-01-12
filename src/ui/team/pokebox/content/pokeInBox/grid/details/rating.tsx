import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {RatingRelativeStrength} from '@/components/shared/pokemon/rating/units/relativeStrength';
import {PokeInBoxRatingStats} from '@/ui/team/pokebox/content/pokeInBox/common/rating/main';
import {pokeInBoxRatingCategory} from '@/ui/team/pokebox/content/pokeInBox/const';
import {PokeInBoxGridDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/grid/details/type';
import {useCalculatePokeInBoxRating} from '@/ui/team/pokebox/content/pokeInBox/worker/rating/hook';


export const PokeInBoxGridRating = (props: PokeInBoxGridDetailsProps) => {
  const ratingReturn = useCalculatePokeInBoxRating(props);

  const {baseDiffPercent} = ratingReturn.result.result[pokeInBoxRatingCategory];

  return (
    <Flex>
      <RatingRelativeStrength baseDiffPercent={baseDiffPercent}/>
      <PokeInBoxRatingStats {...ratingReturn}/>
    </Flex>
  );
};
