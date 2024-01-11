import {describe, expect, it} from '@jest/globals';

import {defaultProducingParams} from '@/const/game/production';
import {defaultSeedUsage} from '@/const/game/seed';
import {defaultUserSettingsBundle} from '@/const/user/bundle';
import {testBerryDataMap} from '@/tests/data/game/berry';
import {testIngredientChainMap} from '@/tests/data/game/ingredient/chain';
import {testIngredientMap} from '@/tests/data/game/ingredient/data';
import {testIngredientProductionAtLevels} from '@/tests/data/game/ingredient/productionAtLevel';
import {testMainSkillMap} from '@/tests/data/game/mainSkill';
import {testMealData} from '@/tests/data/game/meal';
import {testPokemonData, testPokemonList} from '@/tests/data/game/pokemon';
import {testSubSkillMap} from '@/tests/data/game/subSkill';
import {calculateRatingResultOfLevel} from '@/utils/game/rating/calc/main';


describe('Rating / Calculate', () => {
  it('factors in carry limit if the evolution count is changed', async () => {
    const {result} = await calculateRatingResultOfLevel({
      level: 30,
      pokemon: testPokemonData.absol,
      pokemonList: testPokemonList,
      seeds: defaultSeedUsage,
      evolutionCount: 1,
      ingredients: testIngredientProductionAtLevels['1'],
      nature: null,
      pokemonProducingParams: {
        ...defaultProducingParams,
        pokemonId: 359,
        ingredientSplit: 0.2,
      },
      snorlaxFavorite: {},
      subSkill: {},
      berryDataMap: testBerryDataMap,
      ingredientChainMap: testIngredientChainMap,
      ingredientMap: testIngredientMap,
      mainSkillMap: testMainSkillMap,
      subSkillMap: {},
      mealMap: testMealData,
      basis: 'totalProduction',
      friendshipLevel: 0,
      bundle: defaultUserSettingsBundle,
      useNestedWorker: false,
    });

    expect(result.intra.baseDiffPercent).not.toBe(0);
  });

  it('factors in carry limit when the level activates subskill bonus', async () => {
    const {result} = await calculateRatingResultOfLevel({
      level: 30,
      pokemon: testPokemonData.absol,
      pokemonList: testPokemonList,
      seeds: defaultSeedUsage,
      evolutionCount: 0,
      ingredients: testIngredientProductionAtLevels['1'],
      nature: null,
      pokemonProducingParams: {
        ...defaultProducingParams,
        pokemonId: 359,
        ingredientSplit: 0.2,
      },
      snorlaxFavorite: {},
      subSkill: {25: 19},
      berryDataMap: testBerryDataMap,
      ingredientChainMap: testIngredientChainMap,
      ingredientMap: testIngredientMap,
      mainSkillMap: testMainSkillMap,
      subSkillMap: testSubSkillMap,
      mealMap: testMealData,
      basis: 'totalProduction',
      friendshipLevel: 0,
      bundle: defaultUserSettingsBundle,
      useNestedWorker: false,
    });

    expect(result.intra.baseDiffPercent).not.toBe(0);
  });

  it('factors in carry limit when the level has not activated subskill bonus', async () => {
    const {result} = await calculateRatingResultOfLevel({
      level: 15,
      pokemon: testPokemonData.absol,
      pokemonList: testPokemonList,
      seeds: defaultSeedUsage,
      evolutionCount: 0,
      ingredients: testIngredientProductionAtLevels['1'],
      nature: null,
      pokemonProducingParams: {
        ...defaultProducingParams,
        pokemonId: 359,
        ingredientSplit: 0.2,
      },
      snorlaxFavorite: {},
      subSkill: {25: 19},
      berryDataMap: testBerryDataMap,
      ingredientChainMap: testIngredientChainMap,
      ingredientMap: testIngredientMap,
      mainSkillMap: testMainSkillMap,
      subSkillMap: testSubSkillMap,
      mealMap: testMealData,
      basis: 'totalProduction',
      friendshipLevel: 0,
      bundle: defaultUserSettingsBundle,
      useNestedWorker: false,
    });

    expect(result.intra.baseDiffPercent).toBe(0);
  });
});
