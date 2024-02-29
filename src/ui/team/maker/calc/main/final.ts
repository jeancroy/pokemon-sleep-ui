import {getTeamMakerComps} from '@/ui/team/maker/calc/getComps';
import {TeamMakerCalcResultsOpts} from '@/ui/team/maker/type/calc';
import {TeamMakerResult} from '@/ui/team/maker/type/result';


export const getTeamMakerFinalResult = (opts: TeamMakerCalcResultsOpts): TeamMakerResult => {
  const {input, bundle} = opts;

  return {
    comps: getTeamMakerComps(opts),
    inputUsed: input,
    bundleUsed: bundle,
  };
};
