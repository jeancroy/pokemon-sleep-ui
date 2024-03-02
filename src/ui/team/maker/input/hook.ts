import React from 'react';

import {generatePokemonInputFilter} from '@/components/shared/pokemon/filter/utils/generate';
import {defaultPokemonIndividualParams} from '@/const/game/pokemon';
import {defaultSnorlaxFavorite} from '@/const/game/snorlax';
import {ConfigBundle} from '@/types/userData/config/bundle';
import {defaultTeamMakerMaxResultCount} from '@/ui/team/maker/const';
import {enforceTeamMakerInput} from '@/ui/team/maker/input/utils';
import {TeamMakerInput} from '@/ui/team/maker/type/input';


type UseTeamMakerInputOpts = {
  serverConfigBundle: ConfigBundle,
};

export const useTeamMakerInput = ({serverConfigBundle}: UseTeamMakerInputOpts) => {
  const [input, setInput] = React.useState<TeamMakerInput>({
    source: 'pokebox',
    snorlaxFavorite: defaultSnorlaxFavorite,
    pokemon: generatePokemonInputFilter({
      isLevelAgnostic: false,
      defaultPokemonLevel: 1,
    }),
    mealType: serverConfigBundle.cookingConfig.mealType,
    recipeLevel: serverConfigBundle.cookingConfig.recipeLevel,
    ingredientCount: serverConfigBundle.cookingConfig.ingredientCount,
    potCapacity: serverConfigBundle.cookingConfig.potCapacity,
    memberCount: 5,
    basis: 'strength',
    previewLevel: null,
    vanillaPresets: {
      bySpecialty: {
        berry: defaultPokemonIndividualParams,
        ingredient: defaultPokemonIndividualParams,
        skill: defaultPokemonIndividualParams,
      },
      shared: defaultPokemonIndividualParams,
      mode: 'shared',
    },
    previewFinalEvolution: false,
    target: serverConfigBundle.cookingConfig.target,
    showInsufficientIngredients: true,
    teamCompsToShow: defaultTeamMakerMaxResultCount,
  });

  return {
    input: enforceTeamMakerInput(input),
    setInput,
  };
};
