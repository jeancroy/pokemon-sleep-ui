import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {RatingDetailsEntry} from '@/components/shared/pokemon/rating/section/details/entry';
import {RatingResultProps, RatingSummaryCommonProps} from '@/components/shared/pokemon/rating/type';
import {RatingResultOfLevel} from '@/types/game/pokemon/rating/result';


type Props = Omit<RatingResultProps, 'pokemonMaxLevel'> & RatingSummaryCommonProps & {
  onRated: (result: RatingResultOfLevel) => void,
};

export const RatingDetails = ({resultMap, config, onRated, ...props}: Props) => {
  const {activeNumericKeyLevels} = props;
  const {category} = config;

  return (
    <Flex className="gap-1.5">
      {activeNumericKeyLevels.map((level) => {
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
