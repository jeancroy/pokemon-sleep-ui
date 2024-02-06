import {defaultLevel} from '@/const/game/production';
import {BerryData} from '@/types/game/berry';
import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {ProducingRateCommonParams, ProducingRateOfItemOfSessions} from '@/types/game/producing/rate';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {toSum} from '@/utils/array';
import {applyBonus} from '@/utils/game/producing/apply/bonus';
import {getStrengthMultiplier} from '@/utils/game/producing/multiplier';
import {getProducingRateBase} from '@/utils/game/producing/rateBase';
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
}: GetBerryProducingRateOpts): ProducingRateOfItemOfSessions => {
  const {bonus} = calculatedSettings;
  const {mapMultiplier} = bonus;

  const isSnorlaxFavorite = snorlaxFavorite.berry[berryData.id] ?? false;
  const strengthMultiplier = getStrengthMultiplier({
    bonus,
    strengthMultiplierType: 'berry',
  });
  const data = {
    id: pokemon.berry.id,
    frequency,
    ...getProducingRateBase({
      frequency,
      // Specialty handling is already included in `pokemon.berry.quantity`
      count: pokemon.berry.quantity + toSum(getSubSkillBonusValue(subSkillBonus, 'berryCount')),
      picks: 1,
      energyPerCount: (
        Math.ceil((berryData.energy[(level ?? defaultLevel) - 1]?.energy ?? NaN) * mapMultiplier) *
        (isSnorlaxFavorite ? 2 : 1)
      ),
    }),
  };

  return {
    id: pokemon.berry.id,
    sleep1: applyBonus({
      bonus,
      strengthMultiplier,
      producingState: 'sleep1',
      data,
    }),
    sleep2: applyBonus({
      bonus,
      strengthMultiplier,
      producingState: 'sleep2',
      data,
    }),
    awake: applyBonus({
      bonus,
      strengthMultiplier,
      producingState: 'awake',
      data,
    }),
  };
};
