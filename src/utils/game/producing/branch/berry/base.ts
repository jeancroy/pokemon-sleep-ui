import {defaultLevel} from '@/const/game/production/defaults';
import {ProductionOfDrop} from '@/types/game/producing/rate/base';
import {toSum} from '@/utils/array';
import {GetBerryProductionBaseOpts} from '@/utils/game/producing/branch/berry/type';
import {getStrengthMultiplier} from '@/utils/game/producing/multiplier';
import {getProductionBase} from '@/utils/game/producing/toBase/main';
import {getSubSkillBonusValue} from '@/utils/game/subSkill/effect';


export const getBerryProductionBase = ({
  level,
  pokemon,
  baseFrequency,
  calculatedUserConfig,
  subSkillBonus,
  snorlaxFavorite,
  berryData,
}: GetBerryProductionBaseOpts): ProductionOfDrop => {
  const {bonus} = calculatedUserConfig;
  const {mapMultiplier} = bonus;

  const isSnorlaxFavorite = snorlaxFavorite.berry[berryData.id] ?? false;
  const strengthMultiplier = getStrengthMultiplier({
    bonus,
    strengthMultiplierType: 'berry',
  });

  return getProductionBase({
    id: pokemon.berry.id,
    baseFrequency,
    // Specialty handling is already included in `pokemon.berry.quantity`
    qtyPerHelp: pokemon.berry.quantity + toSum(getSubSkillBonusValue(subSkillBonus, 'berryCount')),
    strengthPerQtyPerHelp: (
      Math.ceil((berryData.energy[(level ?? defaultLevel) - 1]?.energy ?? NaN) * mapMultiplier * strengthMultiplier) *
      (isSnorlaxFavorite ? 2 : 1)
    ),
  });
};
