import {defaultLevel} from '@/const/game/production/defaults';
import {BerryData} from '@/types/game/berry';
import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {
  ProducingRateCommonParams, ProducingRateOfBranch,
  ProducingRateOfBranchByState,
} from '@/types/game/producing/rate';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {toSum} from '@/utils/array';
import {applyBonus} from '@/utils/game/producing/apply/bonus/bonusWithMultiplier';
import {getStrengthMultiplier} from '@/utils/game/producing/multiplier';
import {getProducingRateOfBranch} from '@/utils/game/producing/rateOfBranch';
import {getSubSkillBonusValue} from '@/utils/game/subSkill/effect';


export type GetBerryProducingRateOpts = ProducingRateCommonParams & {
  subSkillBonus: GroupedSubSkillBonus | null,
  snorlaxFavorite: SnorlaxFavorite,
  berryData: BerryData,
};

export const getBerryProducingRate = ({
  level,
  pokemon,
  frequency,
  calculatedSettings,
  subSkillBonus,
  snorlaxFavorite,
  berryData,
}: GetBerryProducingRateOpts): ProducingRateOfBranchByState => {
  const {bonus} = calculatedSettings;
  const {mapMultiplier} = bonus;

  const isSnorlaxFavorite = snorlaxFavorite.berry[berryData.id] ?? false;
  const strengthMultiplier = getStrengthMultiplier({
    bonus,
    strengthMultiplierType: 'berry',
  });
  const rateBase: ProducingRateOfBranch = getProducingRateOfBranch({
    id: pokemon.berry.id,
    frequency,
    // Specialty handling is already included in `pokemon.berry.quantity`
    count: pokemon.berry.quantity + toSum(getSubSkillBonusValue(subSkillBonus, 'berryCount')),
    picks: 1,
    energyPerCount: (
      Math.ceil((berryData.energy[(level ?? defaultLevel) - 1]?.energy ?? NaN) * mapMultiplier) *
      (isSnorlaxFavorite ? 2 : 1)
    ),
  });

  return {
    id: pokemon.berry.id,
    rateBase,
    sleep1: applyBonus({
      bonus,
      strengthMultiplier,
      producingState: 'sleep1',
      rateBase,
    }),
    sleep2: applyBonus({
      bonus,
      strengthMultiplier,
      producingState: 'sleep2',
      rateBase,
    }),
    awake: applyBonus({
      bonus,
      strengthMultiplier,
      producingState: 'awake',
      rateBase,
    }),
  };
};
