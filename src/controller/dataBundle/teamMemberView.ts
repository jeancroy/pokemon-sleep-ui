import {TeamMemberViewRequiredData} from '@/components/shared/team/memberView/type';
import {getBerryDataMap, getPokemonMaxLevelByBerry} from '@/controller/berry';
import {getConfigRequiredData} from '@/controller/dataBundle/config';
import {getIngredientMap} from '@/controller/ingredient';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getMainSkillMap} from '@/controller/mainSkill';
import {getPokedexMap} from '@/controller/pokemon/info';
import {getPokemonProducingParamsMap} from '@/controller/pokemon/producing';
import {getRecipeLevelData} from '@/controller/recipeLevel';
import {getSubSkillMap} from '@/controller/subSkill';


export const getTeamMemberViewRequiredData = async (): Promise<TeamMemberViewRequiredData> => {
  const [
    configRequiredData,
    ingredientMap,
    ingredientChainMap,
    pokedexMap,
    subSkillMap,
    berryDataMap,
    mainSkillMap,
    recipeLevelData,
    pokemonProducingParamsMap,
    pokemonMaxLevel,
  ] = await Promise.all([
    getConfigRequiredData(),
    getIngredientMap(),
    getIngredientChainMap(),
    getPokedexMap(),
    getSubSkillMap(),
    getBerryDataMap(),
    getMainSkillMap(),
    getRecipeLevelData(),
    getPokemonProducingParamsMap(),
    getPokemonMaxLevelByBerry(),
  ]);

  return {
    ...configRequiredData,
    ingredientMap,
    ingredientChainMap,
    pokedexMap,
    subSkillMap,
    berryDataMap,
    mainSkillMap,
    recipeLevelData,
    pokemonProducingParamsMap,
    pokemonMaxLevel,
  };
};
