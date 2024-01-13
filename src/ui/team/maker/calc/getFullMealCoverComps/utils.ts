import {TeamMakerFullMealCoverProductionMap} from '@/ui/team/maker/calc/getFullMealCoverComps/type';
import {TeamMakerBasisValue, TeamMakerPokemonLimits} from '@/ui/team/maker/type/common';


type GetTeamMakerFullMealCoverProductionMapOpts = {
  pokemonLimits: TeamMakerPokemonLimits[],
  getBasisValue: (limits: TeamMakerPokemonLimits) => TeamMakerBasisValue,
};

export const getTeamMakerFullMealCoverProductionMap = ({
  pokemonLimits,
  getBasisValue,
}: GetTeamMakerFullMealCoverProductionMapOpts) => {
  const productionMap: TeamMakerFullMealCoverProductionMap<TeamMakerPokemonLimits> = {};

  for (const pokemonLimit of pokemonLimits) {
    const ingredientProduction = getBasisValue(pokemonLimit).ingredientProduction;

    for (const ingredientIdStr of Object.keys(ingredientProduction)) {
      const ingredientId = parseInt(ingredientIdStr);

      if (!(ingredientId in productionMap)) {
        productionMap[ingredientId] = [];
      }

      productionMap[ingredientId]?.push({
        payload: pokemonLimit,
        ingredientProduction,
      });
    }
  }

  return productionMap;
};
