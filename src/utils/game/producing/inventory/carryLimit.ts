import {PokemonInfo} from '@/types/game/pokemon';
import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {CarryLimitInfo} from '@/types/game/producing/inventory';
import {UserCalculationBehavior} from '@/types/userData/config/user/behavior';
import {toSum} from '@/utils/array';
import {getSubSkillBonusValue} from '@/utils/game/subSkill/effect';


type GetCarryLimitInfoOpts = {
  pokemon: PokemonInfo,
  evolutionCount: number,
  subSkillBonus: GroupedSubSkillBonus,
  behavior: UserCalculationBehavior,
};

export const getCarryLimitInfo = ({
  pokemon,
  evolutionCount,
  subSkillBonus,
  behavior,
}: GetCarryLimitInfoOpts): CarryLimitInfo => {
  const {stats} = pokemon;

  const base = stats.maxCarry + evolutionCount * 5;
  let final = base + toSum(getSubSkillBonusValue(subSkillBonus, 'inventory'));

  if (behavior.goodCampTicket) {
    final = Math.ceil(final * 1.2);
  }

  return {base, final};
};
