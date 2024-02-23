import {PokemonItemStatsCalcResult} from '@/components/shared/pokemon/icon/itemStats/type';
import {PokemonItemStatsWorkerOpts} from '@/components/shared/pokemon/icon/itemStats/worker/type';
import {generatePossibleIngredientProductions} from '@/utils/game/producing/ingredient/chain';
import {getPokemonProductionSingle} from '@/utils/game/producing/main/entry/single';
import {getPokemonProducingParams, getProductionIndividualParams} from '@/utils/game/producing/params';
import {getTotalStrengthOfPokemonProduction} from '@/utils/game/producing/reducer/total/strength';
import {isNotNullish} from '@/utils/type';


const onMessage = ({data}: MessageEvent<PokemonItemStatsWorkerOpts>) => {
  const {
    pokedex,
    pokemonProducingParamsMap,
    pokemonIngredientProduction,
    berryDataMap,
    ingredientChainMap,
    mainSkillMap,
    subSkillMap,
    input,
    calculatedConfigBundle,
  } = data;
  const {level} = input;

  const producingStats: PokemonItemStatsCalcResult[] = pokemonIngredientProduction
    .flatMap(({pokemonId, ingredientChainId}) => {
      const pokemon = pokedex[pokemonId];

      if (!pokemon) {
        return null;
      }

      const chain = ingredientChainMap[ingredientChainId];

      if (!chain) {
        return null;
      }

      return [...generatePossibleIngredientProductions({level, chain})]
        .map((ingredients): PokemonItemStatsCalcResult => {
          const pokemonRate = getPokemonProductionSingle({
            pokemon,
            pokemonProducingParams: getPokemonProducingParams({
              pokemonId: pokemon.id,
              pokemonProducingParamsMap,
            }),
            berryData: berryDataMap[pokemon.berry.id],
            ingredients,
            skillData: mainSkillMap[pokemon.skill],
            ...getProductionIndividualParams({
              input,
              pokemon,
              subSkillMap,
            }),
            ...data,
            ...calculatedConfigBundle,
          }).atStage.final;

          return {
            pokemon,
            pokemonRate,
            uniqueKey: `${pokemon.id}|${ingredients.map(({id}) => id).join('-')}`,
            ingredients,
            dailyTotalEnergy: getTotalStrengthOfPokemonProduction(pokemonRate),
          };
        });
    })
    .filter(isNotNullish);

  postMessage(producingStats);
};

addEventListener('message', onMessage);
