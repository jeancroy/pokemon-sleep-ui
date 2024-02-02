import React from 'react';

import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {Flex} from '@/components/layout/flex/common';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {PokemonProducingRateMultiple} from '@/components/shared/pokemon/production/multiple';
import {PokemonProducingRateSingle} from '@/components/shared/pokemon/production/single/main';
import {PokemonProductionSplitFromPokemonRate} from '@/components/shared/pokemon/production/split/fromPokemon';
import {ProducingRateContent} from '@/components/shared/production/rate/content';
import {IngredientProduction} from '@/types/game/pokemon/ingredient';
import {PokemonProductionCombinationCommonProps} from '@/ui/pokedex/page/production/combination/type';
import {PokemonProductionIngredientLink} from '@/ui/pokedex/page/production/ingredient/link';
import {getPokemonProducingRateSingle} from '@/utils/game/producing/main/single';
import {getProducingRateIndividualParams} from '@/utils/game/producing/params';
import {getTotalEnergyOfPokemonProducingRate} from '@/utils/game/producing/rateReducer';


type Props = PokemonProductionCombinationCommonProps & {
  ingredients: IngredientProduction[],
};

export const PokemonProductionCombinationItem = ({ingredients, ...props}: Props) => {
  const {
    input,
    pokemon,
    translatedSettings,
    mainSkillMap,
    subSkillMap,
  } = props;

  const skillData = mainSkillMap[pokemon.skill];

  const rate = getPokemonProducingRateSingle({
    ingredients,
    skillData,
    ...getProducingRateIndividualParams({
      input,
      pokemon,
      subSkillMap,
    }),
    ...translatedSettings,
    ...props,
  }).atStage.final;
  const {berry, ingredient} = rate;

  return (
    <AnimatedCollapse show appear>
      <Flex center noFullWidth className="bg-plate gap-1.5">
        <Flex direction="row" center wrap className="gap-1">
          {ingredients.map((production) => (
            <PokemonProductionIngredientLink
              key={`${production.id}-${production.qty}`}
              production={production}
            />
          ))}
        </Flex>
        <PokemonProductionSplitFromPokemonRate
          rate={rate}
          state="equivalent"
          specialty={pokemon.specialty}
        />
        <Flex direction="row" className="items-end justify-between">
          <ProducingRateContent
            dailyRate={getTotalEnergyOfPokemonProducingRate(rate)}
            isEnergy
            normalSize
          />
          <Flex noFullWidth>
            <PokemonProducingRateSingle
              horizontal
              hideFrequency
              rate={berry}
              getIcon={(dimension) => (
                <PokemonBerryIcon id={berry.id} dimension={dimension}/>
              )}
              display="item"
            />
            <PokemonProducingRateMultiple
              horizontal
              hideFrequency
              rates={Object.values(ingredient)}
              getIcon={(rate, dimension) => (
                <PokemonIngredientIcon id={rate.id} dimension={dimension}/>
              )}
            />
          </Flex>
        </Flex>
      </Flex>
    </AnimatedCollapse>
  );
};
