import {PokemonItemStatsCalcResult} from '@/components/shared/pokemon/icon/itemStats/type';
import {PokemonItemStatsWorkerOpts} from '@/components/shared/pokemon/icon/itemStats/worker/type';
import {generatePossibleIngredientProductions} from '@/utils/game/producing/ingredient/chain';
import {getPokemonProducingRateSingle} from '@/utils/game/producing/main/single';
import {getPokemonProducingParams, getProducingRateIndividualParams} from '@/utils/game/producing/params';
import {getTotalStrengthOfPokemonProducingRate} from '@/utils/game/producing/reducer/sum';
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
          const pokemonRate = getPokemonProducingRateSingle({
            pokemon,
            pokemonProducingParams: getPokemonProducingParams({
              pokemonId: pokemon.id,
              pokemonProducingParamsMap,
            }),
            berryData: berryDataMap[pokemon.berry.id],
            ingredients,
            skillData: mainSkillMap[pokemon.skill],
            ...getProducingRateIndividualParams({
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
            dailyTotalEnergy: getTotalStrengthOfPokemonProducingRate(pokemonRate),
          };
        });
    })
    .filter(isNotNullish);

  postMessage(producingStats);
};

addEventListener('message', onMessage);
