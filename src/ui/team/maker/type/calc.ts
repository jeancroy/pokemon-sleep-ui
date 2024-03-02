import {ConfigBundle} from '@/types/userData/config/bundle';
import {CalculatedCookingConfig} from '@/types/userData/config/cooking/main';
import {TeamMakerCalcDataProps} from '@/ui/team/maker/type';
import {TeamMakerCandidateData} from '@/ui/team/maker/type/common';
import {TeamMakerInput} from '@/ui/team/maker/type/input';


export type TeamMakerCalcInitOpts = TeamMakerCalcDataProps & {
  input: TeamMakerInput,
  bundle: ConfigBundle,
};

export type TeamMakerCalcGenerateCompOpts = TeamMakerCalcInitOpts & {
  calculatedCookingConfig: CalculatedCookingConfig,
  candidates: TeamMakerCandidateData[],
};

export type TeamMakerCalcResultsOpts = TeamMakerCalcGenerateCompOpts & {
  teamComps: TeamMakerCandidateData[][],
};

export type TeamMakerCalcInitReturn = TeamMakerCalcGenerateCompOpts;

export type TeamMakerCalcGenerateCompReturn = TeamMakerCalcGenerateCompOpts & {
  allPossibleTeamComps: TeamMakerCandidateData[][],
};
