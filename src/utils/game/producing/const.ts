import {maxTeamMemberCount} from '@/const/game/production/const';
import {getHelpingBonusSimpleMultiplier} from '@/utils/game/producing/multiplier';


export const helpingBonusSimpleMultiplier = getHelpingBonusSimpleMultiplier(maxTeamMemberCount);
