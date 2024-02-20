import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {PokemonIngredientProduction} from '@/components/shared/pokemon/production/ingredient/production';
import {TeamMakerResultButtonFinalEstimate} from '@/ui/team/maker/result/button/finalEstimate';
import {TeamMakerIngredientSatisfactionIndicator} from '@/ui/team/maker/result/button/satisfyIngredients';
import {TeamMakerResultSummary} from '@/ui/team/maker/result/button/summary';
import {TeamMakerInput} from '@/ui/team/maker/type/input';
import {TeamMakerResultComp} from '@/ui/team/maker/type/result';


type Props = {
  comp: TeamMakerResultComp,
  inputUsed: TeamMakerInput,
};

export const TeamMakerResultButton = ({comp, inputUsed}: Props) => {
  const {
    rates,
    ingredientStats,
    finalEstimates,
    basisValue,
  } = comp;
  const {basis} = inputUsed;

  return (
    <Flex className="gap-1">
      <Flex center className="gap-1.5 md:flex-row">
        <Flex noFullWidth direction="row" className="gap-1.5">
          {rates.rates.map(({payload}) => (
            <div key={payload.pokeInBox.uuid} className="relative size-8">
              <PokemonImage
                pokemonId={payload.pokeInBox.pokemon}
                image={{type: 'default', image: 'icon'}}
                isShiny={false}
                alt={payload.pokeInBox.name ?? undefined}
              />
            </div>
          ))}
        </Flex>
        <Flex noFullWidth direction="row" className="items-center gap-1.5 text-lg">
          {
            inputUsed.mealType !== null &&
            <TeamMakerIngredientSatisfactionIndicator shortage={ingredientStats.shortage}/>
          }
          <TeamMakerResultSummary basis={basis} basisValue={basisValue}/>
        </Flex>
        <TeamMakerResultButtonFinalEstimate finalEstimates={finalEstimates}/>
      </Flex>
      <Flex direction="row" center wrap className="gap-1">
        {Object.entries(rates.grouped.ingredient).map(([id, rate]) => {
          if (!rate) {
            return null;
          }

          return <PokemonIngredientProduction key={id} id={Number(id)} rate={rate} hideStrength noLink/>;
        })}
      </Flex>
    </Flex>
  );
};
