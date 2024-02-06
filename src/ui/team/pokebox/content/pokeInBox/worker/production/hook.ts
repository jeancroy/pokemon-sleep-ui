import React from 'react';

import {PokemonInfo} from '@/types/game/pokemon';
import {PokeInBoxProductionRateCalcState} from '@/ui/team/pokebox/content/pokeInBox/worker/production/type';
import {pokeboxProductionPool} from '@/ui/team/pokebox/content/pokeInBox/worker/production/workerPool';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';
import {Nullable} from '@/utils/type';


type UseCalculatePokeInBoxProductionOpts = Omit<PokeInBoxCommonProps, 'pokemon'> & {
  pokemon: Nullable<PokemonInfo>,
};

export const useCalculatePokeInBoxProduction = ({
  bundle,
  snorlaxFavorite,
  mealMap,
  cookingRecoveryData,
  pokeInBox,
  pokemon,
  pokemonProducingParamsMap,
  pokedexMap,
  subSkillMap,
  berryDataMap,
  ingredientMap,
  ingredientChainMap,
  mainSkillMap,
  recipeLevelData,
  eventStrengthMultiplierData,
  ratingBasis,
}: UseCalculatePokeInBoxProductionOpts): PokeInBoxProductionRateCalcState => {
  const [state, setState] = React.useState<PokeInBoxProductionRateCalcState>({
    loading: false,
    rate: null,
  });

  React.useEffect(() => {
    if (!pokemon) {
      return;
    }

    setState((original) => ({
      ...original,
      loading: true,
    }));

    pokeboxProductionPool.queue(async (calculate) => setState({
      loading: false,
      rate: await calculate({
        bundle,
        snorlaxFavorite,
        mealMap,
        cookingRecoveryData,
        pokeInBox,
        pokemon,
        pokemonProducingParamsMap,
        pokedexMap,
        subSkillMap,
        berryDataMap,
        ingredientMap,
        ingredientChainMap,
        mainSkillMap,
        recipeLevelData,
        eventStrengthMultiplierData,
        ratingBasis,
      }),
    }));
  }, [bundle, snorlaxFavorite, pokeInBox, ratingBasis]);

  return state;
};
