import {CalculatedUserConfig} from '@/types/userData/config/user/main';


export type PokemonProductionInCalcWithPayload<TRate, TPayload> = {
  rate: TRate,
  payload: TPayload,
  calculatedUserConfig: CalculatedUserConfig,
};
