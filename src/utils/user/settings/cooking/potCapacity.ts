import {UserSettings} from '@/types/userData/settings/main';


type ToActualPotCapacityOpts = {
  baseCapacity: number,
  settings: UserSettings,
};

export const toActualPotCapacity = ({baseCapacity, settings}: ToActualPotCapacityOpts) => {
  const {goodCampTicket} = settings.behavior;

  return Math.ceil(baseCapacity * (goodCampTicket ? 1.5 : 1));
};
