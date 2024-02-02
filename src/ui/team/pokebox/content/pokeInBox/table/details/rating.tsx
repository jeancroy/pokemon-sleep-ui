import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {RatingRelativeStrength} from '@/components/shared/pokemon/rating/units/relativeStrength';
import {PokeInBoxRatingStats} from '@/ui/team/pokebox/content/pokeInBox/common/rating/main';
import {pokeInBoxRatingCategory} from '@/ui/team/pokebox/content/pokeInBox/const';
import {PokeInBoxTableDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/table/details/type';
import {useCalculatePokeInBoxRating} from '@/ui/team/pokebox/content/pokeInBox/worker/rating/hook';


export const PokeInBoxTableRating = (props: PokeInBoxTableDetailsProps) => {
  const ratingReturn = useCalculatePokeInBoxRating(props);

  const {baseDiffPercent} = ratingReturn.result.result[pokeInBoxRatingCategory];

  return (
    <Flex direction="row" center noFullWidth className="w-72 gap-1.5">
      <PokeInBoxRatingStats {...ratingReturn}/>
      <div className="w-32">
        <RatingRelativeStrength baseDiffPercent={baseDiffPercent}/>
      </div>
    </Flex>
  );
};
