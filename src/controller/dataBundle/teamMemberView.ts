import {TeamMemberViewRequiredData} from '@/components/shared/team/memberView/type';
import {getBerryDataMap, getPokemonMaxLevelByBerry} from '@/controller/berry';
import {getConfigRequiredData} from '@/controller/dataBundle/config';
import {getIngredientMap} from '@/controller/ingredient';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getMainSkillMap} from '@/controller/mainSkill';
import {getFieldMetaMap} from '@/controller/mapMeta';
import {getPokedexMap} from '@/controller/pokemon/info';
import {getPokemonProducingParamsMap} from '@/controller/pokemon/producing';
import {getPotInfoList} from '@/controller/potInfo';
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
    fieldMetaMap,
    potInfoList,
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
    getFieldMetaMap(),
    getPotInfoList(),
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
    fieldMetaMap,
    potInfoList,
    recipeLevelData,
    pokemonProducingParamsMap,
    pokemonMaxLevel,
  };
};
