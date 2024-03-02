import React from 'react';

import BeakerIcon from '@heroicons/react/24/outline/BeakerIcon';
import HandThumbDownIcon from '@heroicons/react/24/outline/HandThumbDownIcon';
import HandThumbUpIcon from '@heroicons/react/24/outline/HandThumbUpIcon';

import {CollapsibleFull} from '@/components/layout/collapsible/full';
import {useCollapsibleControl} from '@/components/layout/collapsible/hook';
import {Flex} from '@/components/layout/flex/common';
import {RatingDetailsButton} from '@/components/shared/pokemon/rating/section/details/button/main';
import {RatingResultProps} from '@/components/shared/pokemon/rating/type';
import {RatingDataPointUI} from '@/components/shared/pokemon/rating/units/point';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {useRatingWorker} from '@/hooks/rating/hook';
import {RatingResultOfCategoryAtLevel, RatingResultOfLevel} from '@/types/game/pokemon/rating/result';


type Props = RatingResultProps & {
  level: number,
  result: RatingResultOfCategoryAtLevel,
  onRated: (result: RatingResultOfLevel) => void,
};

export const RatingDetailsEntry = ({
  pokemon,
  pokemonList,
  pokemonProducingParams,
  request,
  level,
  result,
  onRated,
}: Props) => {
  const {extrema} = result;

  const {
    berryDataMap,
    ingredientChainMap,
    ingredientMap,
    mainSkillMap,
    subSkillMap,
    mealMap,
    cookingRecoveryData,
    recipeLevelData,
    eventStrengthMultiplierData,
  } = useCommonServerData();

  const collapsible = useCollapsibleControl();
  const [loading, setLoading] = React.useState(false);
  const {rate} = useRatingWorker({
    setLoading,
    onRated,
    opts: {
      level,
      pokemon,
      pokemonList,
      pokemonProducingParams,
      berryDataMap,
      ingredientChainMap,
      ingredientMap,
      mainSkillMap,
      subSkillMap,
      mealMap,
      recipeLevelData,
      eventStrengthMultiplierData,
      cookingRecoveryData,
      useNestedWorker: true,
    },
  });

  React.useEffect(() => {
    if (!request) {
      return;
    }

    rate(request.setup);
  }, [request?.timestamp]);

  return (
    <CollapsibleFull
      control={collapsible}
      disabled={loading || !extrema}
      button={
        <RatingDetailsButton
          level={level}
          loading={loading}
          result={result}
        />
      }
    >
      <Flex className="gap-1.5">
        <RatingDataPointUI
          level={level}
          extrema={extrema?.max}
          subSkillMap={subSkillMap}
          icon={<HandThumbUpIcon/>}
          basis={request?.setup.basis}
          className="bg-green-500/10"
        />
        <RatingDataPointUI
          level={level}
          extrema={extrema?.current}
          subSkillMap={subSkillMap}
          icon={<BeakerIcon/>}
          basis={request?.setup.basis}
          className="bg-slate-500/10"
        />
        <RatingDataPointUI
          level={level}
          extrema={extrema?.min}
          subSkillMap={subSkillMap}
          icon={<HandThumbDownIcon/>}
          basis={request?.setup.basis}
          className="bg-red-500/10"
        />
      </Flex>
    </CollapsibleFull>
  );
};
