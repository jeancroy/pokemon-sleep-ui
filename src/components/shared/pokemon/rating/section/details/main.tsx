import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {RatingDetailsEntry} from '@/components/shared/pokemon/rating/section/details/entry';
import {RatingResultProps, RatingSummaryCommonProps} from '@/components/shared/pokemon/rating/type';
import {useNumericPokemonKeyLevels} from '@/hooks/pokemon/keyLevel/numeric';
import {RatingResultOfLevel} from '@/types/game/pokemon/rating/result';


type Props = Omit<RatingResultProps, 'pokemonMaxLevel'> & RatingSummaryCommonProps & {
  onRated: (result: RatingResultOfLevel) => void,
};

export const RatingDetails = ({resultMap, config, onRated, ...props}: Props) => {
  const {category} = config;

  const numericPokemonKeyLevels = useNumericPokemonKeyLevels();

  return (
    <Flex className="gap-1.5">
      {numericPokemonKeyLevels.map((level) => {
        const result = resultMap[level];

        if (!result) {
          return null;
        }

        return (
          <RatingDetailsEntry
            key={level}
            level={level}
            result={result.result[category]}
            onRated={onRated}
            {...props}
          />
        );
      })}
    </Flex>
  );
};
