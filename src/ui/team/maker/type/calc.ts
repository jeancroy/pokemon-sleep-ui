import {CookingUserSettings, UserSettings} from '@/types/userData/settings';
import {TeamMakerDataProps} from '@/ui/team/maker/type';
import {TeamMakerCandidateData} from '@/ui/team/maker/type/common';
import {TeamMakerInput} from '@/ui/team/maker/type/input';


export type TeamMakerCalcInitOpts = TeamMakerDataProps & {
  input: TeamMakerInput,
  settings: UserSettings,
};

export type TeamMakerCalcGenerateCompOpts = TeamMakerCalcInitOpts & {
  cookingSettings: CookingUserSettings,
  candidates: TeamMakerCandidateData[],
};

export type TeamMakerCalcResultsOpts = TeamMakerCalcGenerateCompOpts & {
  teamComps: TeamMakerCandidateData[][],
};

export type TeamMakerCalcInitReturn = TeamMakerCalcGenerateCompOpts;

export type TeamMakerCalcGenerateCompReturn = TeamMakerCalcGenerateCompOpts & {
  allPossibleTeamComps: TeamMakerCandidateData[][],
};
