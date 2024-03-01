import {PokemonInfo} from '@/types/game/pokemon';
import {Production} from '@/types/game/producing/rate/base';
import {TeamMemberProduction} from '@/types/game/team/production';
import {ProductionComparisonTarget} from '@/types/website/feature/productionComparison';
import {GetProductionComparisonStatsCommonOpts} from '@/ui/production/calc/type';
import {getEffectiveIngredientProductions} from '@/utils/game/ingredient/production';
import {getPokemonProductionSingle} from '@/utils/game/producing/main/entry/single';
import {getPokemonProducingParams, getProductionIndividualParams} from '@/utils/game/producing/params';
import {getTotalPokemonProduction} from '@/utils/game/producing/reducer/total/common';


type GetProductionComparisonTargetStatsOpts = GetProductionComparisonStatsCommonOpts & {
  pokemon: PokemonInfo,
  target: ProductionComparisonTarget,
};

export const getProductionComparisonTargetStats = ({
  berryDataMap,
  mainSkillMap,
  subSkillMap,
  pokemonProducingParamsMap,
  overrideLevel,
  pokemon,
  target,
  ...opts
}: GetProductionComparisonTargetStatsOpts): TeamMemberProduction => {
  const {id, berry, skill} = pokemon;

  const level = overrideLevel ?? target.level;

  const {
    calculatedUserConfig,
    atStage,
  } = getPokemonProductionSingle({
    // `opts` has to be the first because `pokemon`, `berryData`, `ingredients` have to be overridden
    ...opts,
    pokemon,
    pokemonProducingParams: getPokemonProducingParams({
      pokemonId: id,
      pokemonProducingParamsMap,
    }),
    berryData: berryDataMap[berry.id],
    skillData: mainSkillMap[skill],
    ingredients: getEffectiveIngredientProductions({
      level,
      ingredients: target.ingredients,
    }),
    individual: getProductionIndividualParams({
      input: {...target, level},
      pokemon,
      subSkillMap,
    }),
  });
  const rate = atStage.final;

  const total: Production = getTotalPokemonProduction({rate, state: 'equivalent'});

  return {...rate, total, calculatedUserConfig, level};
};
