import {MainSkillData} from '@/types/game/pokemon/mainSkill';
import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {toSum} from '@/utils/array';
import {getSubSkillBonusValue} from '@/utils/game/subSkill/effect';


type GetMainSkillLevelOpts = {
  seedsUsed: number,
  evolutionCount?: number,
  subSkillBonus?: GroupedSubSkillBonus | null,
  mainSkillData: MainSkillData,
};

export const getMainSkillLevel = ({
  seedsUsed,
  evolutionCount,
  subSkillBonus,
  mainSkillData,
}: GetMainSkillLevelOpts) => {
  return Math.min(
    Math.max(...mainSkillData.effects.map(({level}) => level)),
    1 + seedsUsed + (evolutionCount ?? 0) + (toSum(getSubSkillBonusValue(subSkillBonus, 'skillLevel')) ?? 0),
  );
};
