import {specialtyIdMap} from '@/const/game/pokemon';
import {PokemonSpecialtyId} from '@/types/game/pokemon';
import {UserCalculationFullPackBehavior} from '@/types/userData/config/user/behavior';


type IsFullPackEffectiveOpts = {
  fullPackBehavior: UserCalculationFullPackBehavior,
  specialty: PokemonSpecialtyId,
};

export const isFullPackEffective = ({
  fullPackBehavior,
  specialty,
}: IsFullPackEffectiveOpts): boolean => {
  if (fullPackBehavior === 'berryOnly') {
    return specialty === specialtyIdMap.berry;
  }

  if (fullPackBehavior === 'always') {
    return true;
  }

  if (fullPackBehavior === 'disable') {
    return false;
  }

  throw new Error(`Unhandled full pack behavior [${fullPackBehavior}]`);
};
