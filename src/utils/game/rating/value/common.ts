import {NatureId} from '@/types/game/pokemon/nature';
import {PokemonSubSkill} from '@/types/game/pokemon/subSkill';
import {getProductionIndividualParams} from '@/utils/game/producing/params';
import {GetRatingValueOfSimulationOpts} from '@/utils/game/rating/type';
import {RatingValueCommonData} from '@/utils/game/rating/value/type';
import {toRecoveryRate} from '@/utils/game/stamina/recovery';
import {toCalculatedConfigBundle} from '@/utils/user/config/bundle';


type GetRatingValueCommonOpts = {
  baseOpts: Omit<
    GetRatingValueOfSimulationOpts,
    // Omit unused and the other values that must get used from the main props
    'level' | 'ingredients' | 'subSkill' | 'nature'
  >,
  level: number,
  subSkill: PokemonSubSkill,
  nature: NatureId | null,
};

export const getRatingValueCommon = (opts: GetRatingValueCommonOpts): RatingValueCommonData => {
  const {
    baseOpts,
    level,
    subSkill,
    nature,
  } = opts;
  const {
    subSkillMap,
    bundle,
    pokemon,
    snorlaxFavorite,
    evolutionCount,
    seeds,
  } = baseOpts;

  const individual = getProductionIndividualParams({
    input: {level, subSkill, nature, evolutionCount, seeds},
    pokemon,
    subSkillMap,
  });
  const {natureId, subSkillBonus} = individual;

  const calculatedConfigBundle = toCalculatedConfigBundle({
    ...baseOpts,
    ...bundle,
    recoveryRate: toRecoveryRate({
      natureId,
      subSkillBonuses: [subSkillBonus],
    }),
    override: {snorlaxFavorite},
  });
  const {calculatedCookingConfig} = calculatedConfigBundle;
  const {targetMeals} = calculatedCookingConfig;

  return {
    individual,
    calculatedCookingConfig,
    targetMeals,
  };
};
