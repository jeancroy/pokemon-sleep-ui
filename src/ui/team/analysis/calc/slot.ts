import {TeamAnalysisSlotName} from '@/types/website/feature/teamAnalysis';
import {GetTeamProductionOpts} from '@/ui/team/analysis/calc/type';
import {getEffectiveIngredientProductions} from '@/utils/game/ingredient/production';
import {GetPokemonProductionOpts} from '@/utils/game/producing/main/type';
import {
  getPokemonProducingParams,
  getProductionIndividualParams,
} from '@/utils/game/producing/params';


type GetTeamProductionOfSlotOpts = GetTeamProductionOpts & {
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
    alwaysFullPack,
  } = member;

  const pokemon = pokedexMap[pokemonId];
  if (!pokemon) {
    return null;
  }

  const level = overrideLevel ?? member.level;
  const individual = getProductionIndividualParams({
    input: member,
    pokemon,
    subSkillMap,
    override: {level: overrideLevel},
  });

  return {
    rateOpts: {
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
      individual,
      alwaysFullPack,
    },
  };
};
