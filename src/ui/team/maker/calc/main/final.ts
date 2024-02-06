import {getTeamMakerComps} from '@/ui/team/maker/calc/getComps';
import {TeamMakerCalcResultsOpts} from '@/ui/team/maker/type/calc';
import {TeamMakerResult} from '@/ui/team/maker/type/result';


export const getTeamMakerFinalResult = ({
  settings,
  ...opts
}: TeamMakerCalcResultsOpts): TeamMakerResult => {
  const {input} = opts;
  const {basis, snorlaxFavorite} = input;

  return {
    comps: getTeamMakerComps(opts),
    basis,
    snorlaxFavorite,
  };
};
