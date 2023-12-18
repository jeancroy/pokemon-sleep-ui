import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {PokemonIngredientProduction} from '@/components/shared/pokemon/production/ingredient';
import {TeamMakerResultButtonFinalEstimate} from '@/ui/team/maker/result/button/finalEstimate';
import {TeamMakerIngredientSatisfactionIndicator} from '@/ui/team/maker/result/button/satisfyIngredients';
import {TeamMakerResultSummary} from '@/ui/team/maker/result/button/summary';
import {TeamMakerBasis} from '@/ui/team/maker/type/input';
import {TeamMakerResultComp} from '@/ui/team/maker/type/result';


type Props = {
  comp: TeamMakerResultComp,
  basis: TeamMakerBasis,
};

export const TeamMakerResultButton = ({comp, basis}: Props) => {
  const {
    rates,
    ingredientStats,
    finalEstimates,
    basisValue,
  } = comp;

  return (
    <Flex className="gap-1">
      <Flex center className="gap-1.5 md:flex-row">
        <Flex noFullWidth direction="row" className="gap-1.5">
          {rates.rates.map(({payload}) => (
            <div key={payload.uuid} className="relative h-8 w-8">
              <PokemonImage pokemonId={payload.pokemon} image="icon" isShiny={false} alt={payload.name ?? undefined}/>
            </div>
          ))}
        </Flex>
        <Flex noFullWidth direction="row" className="items-center gap-1.5 text-lg">
          <TeamMakerIngredientSatisfactionIndicator shortage={ingredientStats.shortage}/>
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
