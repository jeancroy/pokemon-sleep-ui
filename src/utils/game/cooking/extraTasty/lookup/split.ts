import {extraTastyBasePercent, extraTastySkillPercentMax} from '@/const/game/cooking/extraTasty';
import {ExtraTastyTiming} from '@/types/game/cooking/extraTasty';
import {ExtraTastySplitBranch} from '@/utils/game/cooking/extraTasty/lookup/type';
import {ExtraTastyBranch} from '@/utils/game/cooking/extraTasty/type';


type GetExtraTastySplitBranchOpts = {
  parent: ExtraTastyBranch,
  extraTastyTiming: ExtraTastyTiming,
  extraTastySkillBoostPercent: number,
};

export const getExtraTastySplitBranch = ({
  parent,
  extraTastyTiming,
  extraTastySkillBoostPercent,
}: GetExtraTastySplitBranchOpts): ExtraTastySplitBranch => {
  const extraTastyRate = (extraTastyBasePercent[extraTastyTiming] + parent.extraTastyPercentFromSkill) / 100;

  return {
    // Successful skill resets extra tasty %
    pass: {
      extraTastyPercentFromSkill: extraTastySkillBoostPercent,
      probability: parent.probability * extraTastyRate,
    },
    fail: {
      extraTastyPercentFromSkill: Math.min(
        parent.extraTastyPercentFromSkill + extraTastySkillBoostPercent,
        extraTastySkillPercentMax,
      ),
      probability: parent.probability * (1 - extraTastyRate),
    },
  };
};
