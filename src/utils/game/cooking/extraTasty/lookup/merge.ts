import {ExtraTastyBranch, ExtraTastyLookup} from '@/utils/game/cooking/extraTasty/type';


export type UpdateExtraTastyLookupOpts = {
  lookup: ExtraTastyLookup,
  branch: ExtraTastyBranch,
};

export const updateExtraTastyLookup = ({lookup, branch}: UpdateExtraTastyLookupOpts) => {
  const branchInLookup = lookup.get(branch.extraTastyPercentFromSkill);

  if (!branchInLookup) {
    lookup.set(branch.extraTastyPercentFromSkill, branch);
    return;
  }

  lookup.set(
    branch.extraTastyPercentFromSkill,
    {
      ...branchInLookup,
      probability: branchInLookup.probability + branch.probability,
    },
  );
};
