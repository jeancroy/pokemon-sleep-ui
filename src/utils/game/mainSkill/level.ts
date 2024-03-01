import {MainSkillData, MainSkillLevel} from '@/types/game/pokemon/mainSkill';
import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {toSum} from '@/utils/array';
import {getSubSkillBonusValue} from '@/utils/game/subSkill/effect';
import {Nullable} from '@/utils/type';


type GetMainSkillLevelOpts = {
  seedsUsed: number,
  evolutionCount?: number,
  subSkillBonus?: GroupedSubSkillBonus | null,
  mainSkillData: MainSkillData,
  mainSkillLevelOverride?: Nullable<MainSkillLevel>,
};

export const getMainSkillLevel = ({
  seedsUsed,
  evolutionCount,
  subSkillBonus,
  mainSkillData,
  mainSkillLevelOverride,
}: GetMainSkillLevelOpts) => {
  if (mainSkillLevelOverride != null) {
    if (mainSkillLevelOverride === 'max') {
      return mainSkillData.maxLevel;
    }

    return Math.min(mainSkillData.maxLevel, mainSkillLevelOverride);
  }

  return Math.min(
    mainSkillData.maxLevel,
    1 + seedsUsed + (evolutionCount ?? 0) + (toSum(getSubSkillBonusValue(subSkillBonus, 'skillLevel')) ?? 0),
  );
};
