import {isPokemonIncludedFromFilter} from '@/components/shared/pokemon/filter/utils/filter';
import {maxRecipeLevel} from '@/data/recipeLevel';
import {PokeInBox} from '@/types/userData/pokebox/main';
import {CookingUserSettings, UserSettings} from '@/types/userData/settings';
import {teamMakerProductionPeriod} from '@/ui/team/maker/calc/const';
import {getTeamMakerBasisValue} from '@/ui/team/maker/calc/getBasisValue';
import {TeamMakerCalcInitOpts} from '@/ui/team/maker/type/calc';
import {TeamMakerPokemonLimits} from '@/ui/team/maker/type/common';
import {getPokemonFinalEvolutionIds} from '@/utils/game/pokemon/evolution';
import {getEffectiveIngredientProductions} from '@/utils/game/producing/ingredient/multi';
import {getPokemonProducingRateSingle} from '@/utils/game/producing/main/single';
import {GetPokemonProducingRateOpts} from '@/utils/game/producing/main/type';
import {
  getPokemonProducingParams,
  getProducingRateImplicitParamsFromPokeInbox,
  getProducingRateSingleParams,
} from '@/utils/game/producing/params';
import {toRecoveryRate} from '@/utils/game/stamina/recovery';
import {getLevelToCalcForPokeInBox} from '@/utils/team/previewLevel';
import {isNotNullish} from '@/utils/type';
import {toCalculatedUserSettings} from '@/utils/user/settings/calculated';


type GetTeamMakerPokemonLimitsOpts = Omit<TeamMakerCalcInitOpts, 'pokeboxList'> & {
  pokeboxSource: PokeInBox[],
  settings: UserSettings,
  cookingSettings: CookingUserSettings,
};

export const getTeamMakerPokemonLimits = ({
  pokeboxSource,
  pokedexMap,
  pokemonProducingParamsMap,
  berryDataMap,
  ingredientMap,
  ingredientChainMap,
  mainSkillMap,
  subSkillMap,
  input,
  settings,
  cookingSettings,
}: GetTeamMakerPokemonLimitsOpts): TeamMakerPokemonLimits[] => {
  const {targetMeals} = cookingSettings;

  const toTeamMakerPokemonLimits = (pokeInBox: PokeInBox): TeamMakerPokemonLimits | null => {
    const pokemon = pokedexMap[pokeInBox.pokemon];

    if (!pokemon || !isPokemonIncludedFromFilter({
      filter: input.pokemon,
      pokemon,
      pokemonLevel: pokeInBox.level,
      ingredientMap,
      ingredientChainMap,
    })) {
      return null;
    }

    const level = getLevelToCalcForPokeInBox({
      actualLevel: pokeInBox.level,
      previewLevel: input.previewLevel,
    });
    const singleParams = getProducingRateSingleParams({
      ...pokeInBox,
      level,
      subSkillMap,
    });
    const calculatedSettings = toCalculatedUserSettings({
      settings,
      recoveryRate: toRecoveryRate(singleParams),
    });

    const calcOpts: GetPokemonProducingRateOpts = {
      berryData: berryDataMap[pokemon.berry.id],
      skillData: mainSkillMap[pokemon.skill],
      pokemonProducingParams: getPokemonProducingParams({
        pokemonId: pokeInBox.pokemon,
        pokemonProducingParamsMap,
      }),
      ingredientMap,
      calculatedSettings,
      ...pokeInBox,
      ...singleParams,
      ...getProducingRateImplicitParamsFromPokeInbox({pokeInBox}),
      // Override `level` because preview level might be active
      level,
      // Override `pokemon` in `pokeInBox`
      pokemon,
      // Override `ingredients` in `pokeInBox`
      ingredients: getEffectiveIngredientProductions(pokeInBox),
    };
    const {atStage} = getPokemonProducingRateSingle({
      snorlaxFavorite: input.snorlaxFavorite,
      period: teamMakerProductionPeriod,
      cookingSettings: {
        ...cookingSettings,
        // Reason unknown, but recipe level impacts candidates list, therefore impacting the result.
        // Without this, the result might be incorrect. See #670.
        overrideRecipeLevel: maxRecipeLevel,
      },
      ...calcOpts,
    });

    return {
      best: getTeamMakerBasisValue({
        pokemonRate: atStage.final,
        targetMeals,
      }),
      worst: getTeamMakerBasisValue({
        pokemonRate: atStage.original,
        targetMeals,
      }),
      payload: {
        refData: {
          pokeInBox,
          levelUsed: level,
        },
        calcOpts,
      },
    };
  };

  return pokeboxSource
    .flatMap((pokeInBox): PokeInBox[] => {
      if (!input.previewFinalEvolution) {
        return [pokeInBox];
      }

      return getPokemonFinalEvolutionIds({
        pokemonId: pokeInBox.pokemon,
        pokedex: pokedexMap,
        evolutionCount: pokeInBox.evolutionCount,
      }).map(({id, evolutionCount}): PokeInBox => ({
        ...pokeInBox,
        pokemon: id,
        evolutionCount,
      }));
    })
    .map(toTeamMakerPokemonLimits)
    .filter(isNotNullish);
};
