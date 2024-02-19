import {EffectiveBonus, UserBonus} from '@/types/game/bonus/main';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {StaminaCalcConfig} from '@/types/game/stamina/config';
import {Migratable} from '@/types/migrate';
import {UserCalculationBehavior} from '@/types/userData/config/user/behavior';
import {UserMultiplierConfig} from '@/types/userData/config/user/multiplier';


export type UserConfig = Migratable & {
  bonus: UserBonus,
  stamina: StaminaCalcConfig,
  behavior: UserCalculationBehavior,
  snorlaxFavorite: SnorlaxFavorite,
  multiplier: UserMultiplierConfig,
};

export type CalculatedUserConfig = {
  origin: UserConfig,
  bonus: EffectiveBonus,
};
