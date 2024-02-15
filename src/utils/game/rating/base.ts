import {getEvolutionCountFromPokemonInfo} from '@/utils/game/pokemon/evolution/count';
import {getPokemonProducingRateSingle} from '@/utils/game/producing/main/single';
import {getProducingRateSingleParams} from '@/utils/game/producing/params';
import {getRatingBasisValue} from '@/utils/game/rating/basis';
import {GetRatingValueOfSimulationOpts} from '@/utils/game/rating/type';
import {getRatingProducingRateCalcBehavior} from '@/utils/game/rating/utils';
import {toRecoveryRate} from '@/utils/game/stamina/recovery';
import {toTranslatedSettings} from '@/utils/user/settings/translated';


export const getRatingValueOfBase = (opts: GetRatingValueOfSimulationOpts) => {
  const {
    level,
    basis,
    pokemon,
    subSkillMap,
    bundle,
  } = opts;

  const singleParams = getProducingRateSingleParams({
    level,
    subSkill: {},
    nature: null,
    subSkillMap,
  });
  const {natureId, subSkillBonus} = singleParams;

  return getRatingBasisValue({
    ...opts,
    rate: getPokemonProducingRateSingle({
      ...opts,
      // Override `evolutionCount` in `opts` to apply default evolution count of the Pokémon
      evolutionCount: getEvolutionCountFromPokemonInfo({pokemon}),
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
