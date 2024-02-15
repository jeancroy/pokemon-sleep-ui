import {TeamAnalysisSlotName} from '@/types/teamAnalysis';
import {GetTeamProducingStatsOpts} from '@/ui/team/analysis/calc/type';
import {getEffectiveIngredientProductions} from '@/utils/game/producing/ingredient/multi';
import {GetPokemonProducingRateOpts} from '@/utils/game/producing/main/type';
import {getPokemonProducingParams, getProducingRateSingleParams} from '@/utils/game/producing/params';


type GetTeamProducingStatsSlotOpts = GetTeamProducingStatsOpts & {
  slotName: TeamAnalysisSlotName,
};

type GetProducingStatsOptsSlotReturn = {
  rateOpts: GetPokemonProducingRateOpts,
};

export const getTeamProducingStatsSlot = ({
  overrideLevel,
  pokedexMap,
  pokemonProducingParamsMap,
  berryDataMap,
  ingredientMap,
  mainSkillMap,
  subSkillMap,
  recipeLevelData,
  currentTeam,
  slotName,
}: GetTeamProducingStatsSlotOpts): GetProducingStatsOptsSlotReturn | null => {
  const {members} = currentTeam;

  const member = members[slotName];
  if (!member) {
    return null;
  }

  const {
    pokemonId,
    ingredients,
    evolutionCount,
    subSkill,
    nature,
    seeds,
    alwaysFullPack,
  } = member;

  const pokemon = pokedexMap[pokemonId];
  if (!pokemon) {
    return null;
  }

  const level = overrideLevel ?? member.level;
  const singleParams = getProducingRateSingleParams({
    level,
    subSkill,
    nature,
    subSkillMap,
  });

  return {
    rateOpts: {
      ...singleParams,
      level,
      pokemon,
      pokemonProducingParams: getPokemonProducingParams({
        pokemonId: pokemon.id,
        pokemonProducingParamsMap,
      }),
      berryData: berryDataMap[pokemon.berry.id],
      ingredients: getEffectiveIngredientProductions({level, ingredients}),
      ingredientMap,
      recipeLevelData,
      skillData: mainSkillMap[pokemon.skill],
      evolutionCount,
      seeds,
      alwaysFullPack,
    },
  };
};
