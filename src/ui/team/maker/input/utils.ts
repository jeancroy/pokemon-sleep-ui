import {TeamMakerInput} from '@/ui/team/maker/type/input';


export const enforceTeamMakerInput = (input: TeamMakerInput): TeamMakerInput => {
  const {source, previewLevel} = input;

  return {
    ...input,
    previewLevel: source === 'vanilla' ? null : previewLevel,
  };
};
