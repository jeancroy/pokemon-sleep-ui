import {ExtraTastyBranch, ExtraTastyLookup, ExtraTastyLookupOptions} from '@/utils/game/cooking/extraTasty/type';
import {Nullable} from '@/utils/type';


export type UpdateExtraTastyLookupOpts = {
  lookup: ExtraTastyLookup,
  branch: ExtraTastyBranch,
  extraTastyLookupOptions: Nullable<ExtraTastyLookupOptions>,
};

export const updateExtraTastyLookup = ({lookup, branch, extraTastyLookupOptions}: UpdateExtraTastyLookupOpts) => {
  const useExact = extraTastyLookupOptions == null || extraTastyLookupOptions.lookupStepSize < 1e-6;

  const key = useExact ?
    branch.extraTastyPercentFromSkill :
    Math.round(branch.extraTastyPercentFromSkill / extraTastyLookupOptions.lookupStepSize);

  const branchInLookup = lookup.get(key);

  if (!branchInLookup) {
    lookup.set(key, branch);
    return;
  }

  const sumOfProducts:number = branchInLookup.extraTastyPercentFromSkill * branchInLookup.probability +
      branch.extraTastyPercentFromSkill * branch.probability;
  const sumOfProbabilities = branchInLookup.probability + branch.probability;

  lookup.set(
    key,
    {
      extraTastyPercentFromSkill: sumOfProducts / sumOfProbabilities,
      probability: sumOfProbabilities,
    },
  );
};
