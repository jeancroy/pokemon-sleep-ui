import {RatingCombination} from '@/types/game/pokemon/rating/result';
import {getPokemonProducingRateSingle} from '@/utils/game/producing/main/single';
import {getProducingRateSingleParams} from '@/utils/game/producing/params';
import {getRatingBasisValue} from '@/utils/game/rating/basis';
import {GetRatingValueOfSimulationOpts} from '@/utils/game/rating/type';
import {getRatingProducingRateCalcBehavior} from '@/utils/game/rating/utils';
import {toRecoveryRate} from '@/utils/game/stamina/recovery';
import {toTranslatedSettings} from '@/utils/user/settings/translated';


type GetRatingValueSingleOpts = Omit<
  GetRatingValueOfSimulationOpts,
  'ingredients' | 'subSkill' | 'nature'
> & {
  combination: RatingCombination,
};

export const getRatingValueOfPossibility = ({combination, ...opts}: GetRatingValueSingleOpts) => {
  const {
    level,
    basis,
    subSkillMap,
    bundle,
  } = opts;
  const {nature, subSkill, ingredients} = combination;

  const singleParams = getProducingRateSingleParams({
    level,
    subSkill,
    nature,
    subSkillMap,
  });
  const {natureId, subSkillBonus} = singleParams;

  return getRatingBasisValue({
    ...opts,
    rate: getPokemonProducingRateSingle({
      ...opts,
      ingredients,
      ...singleParams,
      ...toTranslatedSettings({
        ...opts,
        ...bundle,
        recoveryRate: toRecoveryRate({
          natureId,
          subSkillBonuses: [subSkillBonus],
        }),
      }),
      calcBehavior: getRatingProducingRateCalcBehavior(basis),
    }).atStage.final,
    singleParams,
  });
};
