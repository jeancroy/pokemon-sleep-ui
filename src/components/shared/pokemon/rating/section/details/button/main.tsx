import React from 'react';

import {InfoIcon} from '@/components/icons/info';
import {LoadingSvg} from '@/components/icons/loading';
import {Flex} from '@/components/layout/flex/common';
import {RatingDetailsButtonCompleted} from '@/components/shared/pokemon/rating/section/details/button/completed';
import {PokemonKeyLevel} from '@/types/game/pokemon/level';
import {RatingResultOfLevel} from '@/types/game/pokemon/rating/result';


type Props = {
  level: PokemonKeyLevel,
  loading: boolean,
  result: RatingResultOfLevel,
};

export const RatingDetailsButton = ({level, loading, result}: Props) => {
  return (
    <Flex direction="row" className="items-center gap-1.5 p-1">
      <InfoIcon style="glow" dimension="h-7 w-7" className="shrink-0" classTextSize="text-sm">
        {level}
      </InfoIcon>
      <Flex center className="gap-1.5 md:flex-row">
        {loading ? <LoadingSvg className="h-6 w-6"/> : <RatingDetailsButtonCompleted result={result}/>}
      </Flex>
    </Flex>
  );
};
