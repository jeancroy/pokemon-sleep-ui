import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {PokemonKeyLevelInput} from '@/components/shared/pokemon/level/input';
import {RatingBasisSelection} from '@/components/shared/pokemon/rating/basis/selection/main';
import {RatingBasisTitle} from '@/components/shared/pokemon/rating/basis/title';
import {RatingResultProps} from '@/components/shared/pokemon/rating/type';
import {RatingResultTarget} from '@/components/shared/pokemon/rating/units/target';
import {
  RatingWeightedStatsUI,
  RatingWeightedStatsUiProps,
} from '@/components/shared/pokemon/rating/units/weightedStats';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {cloneMerge} from '@/utils/object/cloneMerge';


type Props = RatingResultProps & RatingWeightedStatsUiProps;

export const RatingResultSummary = (props: Props) => {
  const {request, setRequest} = props;

  const {subSkillMap} = useCommonServerData();

  if (!request) {
    return null;
  }

  if (setRequest) {
    return (
      <Flex className="gap-1.5">
        <PokemonKeyLevelInput
          disallowNull
          isActive={(current) => current === request.setup.maxRatingLevel}
          onClick={(maxRatingLevel) => {
            if (maxRatingLevel === null) {
              return;
            }

            setRequest(cloneMerge(request, {setup: {maxRatingLevel}, timestamp: Date.now()}));
          }}
        />
        <RatingBasisSelection
          current={request.setup.basis}
          onSelect={(basis) => (
            setRequest(cloneMerge(request, {setup: {basis}, timestamp: Date.now()}))
          )}
        />
        <RatingWeightedStatsUI {...props}/>
      </Flex>
    );
  }

  return (
    <Flex className="gap-1.5 md:flex-row">
      <RatingResultTarget request={request} subSkillMap={subSkillMap}/>
      <Flex className="info-highlight-inner justify-evenly self-stretch p-3">
        <RatingBasisTitle basis={request.setup.basis} larger/>
        <RatingWeightedStatsUI {...props}/>
      </Flex>
    </Flex>
  );
};
