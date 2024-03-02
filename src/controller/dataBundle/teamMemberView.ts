import {TeamMemberViewRequiredData} from '@/components/shared/team/memberView/type';
import {getPokemonMaxLevelByBerry} from '@/controller/berry';


export const getTeamMemberViewRequiredData = async (): Promise<TeamMemberViewRequiredData> => {
  const [
    pokemonMaxLevel,
  ] = await Promise.all([
    getPokemonMaxLevelByBerry(),
  ]);

  return {
    pokemonMaxLevel,
  };
};
