import {TeamAnalysisSlotName} from '@/types/teamAnalysis';
import {GetTeamProductionStatsOpts} from '@/ui/team/analysis/calc/type';
import {getEffectiveIngredientProductions} from '@/utils/game/ingredient/production';
import {GetPokemonProductionOpts} from '@/utils/game/producing/main/type';
import {getPokemonProducingParams, getProductionSingleParams} from '@/utils/game/producing/params';


type GetTeamProductionOfSlotOpts = GetTeamProductionStatsOpts & {
  slotName: TeamAnalysisSlotName,
};

type GetTeamProductionOfSlotReturn = {
  rateOpts: GetPokemonProductionOpts,
};

export const getTeamProductionOfSlot = ({
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
}: GetTeamProductionOfSlotOpts): GetTeamProductionOfSlotReturn | null => {
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
  const singleParams = getProductionSingleParams({
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
