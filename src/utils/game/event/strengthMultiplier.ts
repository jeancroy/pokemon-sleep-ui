import {StrengthMultiplierType} from '@/types/game/bonus/strength';
import {EventStrengthMultiplierData} from '@/types/game/event/strengthMultiplier';
import {UserStrengthMultiplierConfigEntry} from '@/types/userData/config/user/multiplier';


type GetCurrentEventStrengthMultiplierOpts = {
  type: StrengthMultiplierType,
  eventStrengthMultiplierData: EventStrengthMultiplierData,
};

export const getCurrentEventStrengthMultiplier = ({
  type,
  eventStrengthMultiplierData,
}: GetCurrentEventStrengthMultiplierOpts) => {
  const entry = eventStrengthMultiplierData.current;

  if (!entry) {
    return 1;
  }

  return entry[type];
};

type GetEffectiveStrengthMultiplierOpts = {
  current: number,
  config: UserStrengthMultiplierConfigEntry,
};

export const getEffectiveStrengthMultiplier = ({
  current,
  config,
}: GetEffectiveStrengthMultiplierOpts): number => {
  const {behavior, value} = config;

  if (behavior === 'default') {
    return current;
  }

  return value;
};
