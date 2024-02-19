import {getPokemonProducingRateSingle} from '@/utils/game/producing/main/single';
import {getProducingRateSingleParams} from '@/utils/game/producing/params';
import {getRatingBasisValue} from '@/utils/game/rating/basis';
import {GetRatingValueOfSimulationOpts} from '@/utils/game/rating/type';
import {getRatingProducingRateCalcBehavior} from '@/utils/game/rating/utils';
import {toRecoveryRate} from '@/utils/game/stamina/recovery';
import {toCalculatedConfigBundle} from '@/utils/user/config/bundle';


export const getRatingValueOfCurrent = (opts: GetRatingValueOfSimulationOpts) => {
  const {
    basis,
    bundle,
  } = opts;

  const singleParams = getProducingRateSingleParams(opts);
  const {natureId, subSkillBonus} = singleParams;

  return getRatingBasisValue({
    ...opts,
    rate: getPokemonProducingRateSingle({
      ...opts,
      ...singleParams,
      ...toCalculatedConfigBundle({
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
