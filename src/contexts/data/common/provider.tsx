import React from 'react';

import {getServerSession} from 'next-auth';

import {authOptions} from '@/const/auth';
import {CommonDataClientProvider} from '@/contexts/data/common/client';
import {getBerryDataMap} from '@/controller/berry';
import {getConfigRequiredData} from '@/controller/dataBundle/config';
import {getIngredientMap} from '@/controller/ingredient';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getMainSkillMap} from '@/controller/mainSkill';
import {getFieldMetaMap, getMapIds} from '@/controller/mapMeta';
import {getPokedexMap} from '@/controller/pokemon/info';
import {getPokemonProducingParamsMap} from '@/controller/pokemon/producing';
import {getPotInfoList} from '@/controller/potInfo';
import {getMaxMapBonusPercent} from '@/controller/progress';
import {getRecipeLevelData} from '@/controller/recipeLevel';
import {getSubSkillMap} from '@/controller/subSkill';
import {CommonServerDataCollection} from '@/types/website/data/common';
import {toUnique} from '@/utils/array';
import {getPossibleMealTypes} from '@/utils/game/meal/mealType';
import {isNotNullish} from '@/utils/type';
import {createConfigBundle} from '@/utils/user/config/create';


export const CommonServerDataProvider = async ({children}: React.PropsWithChildren) => {
  const [
    serverSession,
    mapIds,
    maxMapBonusPercent,
    pokedexMap,
    berryDataMap,
    ingredientMap,
    ingredientChainMap,
    mainSkillMap,
    subSkillMap,
    pokemonProducingParamsMap,
    fieldMetaMap,
    potInfoList,
    recipeLevelData,
    configRequiredData,
  ] = await Promise.all([
    getServerSession(authOptions),
    getMapIds(),
    getMaxMapBonusPercent(),
    getPokedexMap(),
    getBerryDataMap(),
    getIngredientMap(),
    getIngredientChainMap(),
    getMainSkillMap(),
    getSubSkillMap(),
    getPokemonProducingParamsMap(),
    getFieldMetaMap(),
    getPotInfoList(),
    getRecipeLevelData(),
    getConfigRequiredData(),
  ]);

  const {mealMap} = configRequiredData;
  const mealTypes = getPossibleMealTypes(Object.values(mealMap).filter(isNotNullish));
  const ingredientIds = toUnique(Object.values(ingredientMap)
    .filter(isNotNullish)
    .map(({id}) => id)
    .sort((a, b) => a - b));

  const data: CommonServerDataCollection = {
    serverSession,
    serverConfigBundle: createConfigBundle(serverSession),
    pokedexMap,
    berryDataMap,
    ingredientIds,
    ingredientMap,
    ingredientChainMap,
    mainSkillMap,
    subSkillMap,
    pokemonProducingParamsMap,
    fieldMetaMap,
    potInfoList,
    recipeLevelData,
    mapIds,
    mealTypes,
    maxMapBonusPercent,
    ...configRequiredData,
  };

  return (
    <CommonDataClientProvider data={data}>
      {children}
    </CommonDataClientProvider>
  );
};
