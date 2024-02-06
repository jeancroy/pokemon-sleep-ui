import {StrengthMultiplierType} from '@/types/game/bonus/strength';
import {EventStrengthMultiplierData} from '@/types/game/event/strengthMultiplier';
import {UserStrengthMultiplierSettingsEntry} from '@/types/userData/settings/multiplier';


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
  settings: UserStrengthMultiplierSettingsEntry,
};

export const getEffectiveStrengthMultiplier = ({
  current,
  settings,
}: GetEffectiveStrengthMultiplierOpts): number => {
  const {behavior, value} = settings;

  if (behavior === 'default') {
    return current;
  }

  return value;
};
