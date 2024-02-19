import {UserConfig} from '@/types/userData/config/user/main';


type ToActualPotCapacityOpts = {
  baseCapacity: number,
  userConfig: UserConfig,
};

export const toActualPotCapacity = ({baseCapacity, userConfig}: ToActualPotCapacityOpts) => {
  const {goodCampTicket} = userConfig.behavior;

  return Math.ceil(baseCapacity * (goodCampTicket ? 1.5 : 1));
};
