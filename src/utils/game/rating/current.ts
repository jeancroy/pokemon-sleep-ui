import {getPokemonProducingRateSingle} from '@/utils/game/producing/main/single';
import {getProducingRateSingleParams} from '@/utils/game/producing/params';
import {getRatingBasisValue} from '@/utils/game/rating/basis';
import {GetRatingValueOfSimulationOpts} from '@/utils/game/rating/type';
import {getRatingProducingRateCalcBehavior} from '@/utils/game/rating/utils';
import {toRecoveryRate} from '@/utils/game/stamina/recovery';
import {toTranslatedSettings} from '@/utils/user/settings/translated';


export const getRatingValueOfCurrent = (opts: GetRatingValueOfSimulationOpts) => {
  const {
    basis,
    bundle,
  } = opts;

  const singleParams = getProducingRateSingleParams(opts);

  return getRatingBasisValue({
    ...opts,
    rate: getPokemonProducingRateSingle({
      ...opts,
      ...singleParams,
      ...toTranslatedSettings({
        ...opts,
        ...bundle,
        recoveryRate: toRecoveryRate(singleParams),
      }),
      calcBehavior: getRatingProducingRateCalcBehavior(basis),
    }).atStage.final,
    singleParams,
  });
};
