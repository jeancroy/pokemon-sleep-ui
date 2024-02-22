import React from 'react';

import {clsx} from 'clsx';

import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {FlexButton} from '@/components/layout/flex/button';
import {Flex} from '@/components/layout/flex/common';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {PokemonProducingRateMultiple} from '@/components/shared/pokemon/production/multiple';
import {PokemonProducingRateSingle} from '@/components/shared/pokemon/production/single/main';
import {PokemonProductionSplitFromPokemonRate} from '@/components/shared/pokemon/production/split/fromPokemon';
import {ProducingRateContent} from '@/components/shared/production/rate/content';
import {
  PokemonProductionCombinationCommonProps,
  PokemonProductionCombinationRateCollectionItem,
} from '@/ui/pokedex/page/production/combination/type';
import {PokemonProductionIngredientLink} from '@/ui/pokedex/page/production/ingredient/link';
import {getTotalStrengthOfPokemonProducingRate} from '@/utils/game/producing/reducer/total/strength';


type Props = PokemonProductionCombinationCommonProps & {
  rateCollectionItem: PokemonProductionCombinationRateCollectionItem,
  onClick: () => void,
};

export const PokemonProductionCombinationItem = ({rateCollectionItem, onClick, ...props}: Props) => {
  const {ingredients, rate} = rateCollectionItem;
  const {pokemon} = props;

  const {berry, ingredient} = rate;

  return (
    <AnimatedCollapse show appear className="button-clickable-bg">
      <FlexButton direction="col" onClick={onClick} center noFullWidth={false} className={clsx(
        'group p-2',
      )}>
        <Flex center className="gap-1 sm:flex-row">
          <Flex direction="row" noFullWidth className="gap-1">
            {ingredients.map((production) => (
              <PokemonProductionIngredientLink
                key={`${production.id}-${production.qty}`}
                production={production}
              />
            ))}
          </Flex>
          <Flex className="gap-0.5">
            <Flex noFullWidth>
              <PokemonProducingRateMultiple
                horizontal
                hideFrequency
                rates={Object.values(ingredient)}
                getIcon={(rate, dimension) => (
                  <PokemonIngredientIcon id={rate.id} dimension={dimension} noLink/>
                )}
              />
              <PokemonProducingRateSingle
                horizontal
                hideFrequency
                rate={berry}
                getIcon={(dimension) => (
                  <PokemonBerryIcon id={berry.id} dimension={dimension} noLink/>
                )}
                display="item"
              />
            </Flex>
            <HorizontalSplitter/>
            <ProducingRateContent
              dailyRate={getTotalStrengthOfPokemonProducingRate(rate)}
              isEnergy
              normalSize
              className="self-end"
            />
          </Flex>
        </Flex>
        <PokemonProductionSplitFromPokemonRate
          rate={rate}
          state="equivalent"
          specialty={pokemon.specialty}
          classBarHeight="h-2"
        />
      </FlexButton>
    </AnimatedCollapse>
  );
};
