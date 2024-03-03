import {ExtraTastyInfo, ExtraTastyTiming} from '@/types/game/cooking/extraTasty';
import {generateDefaultExtraTastyInfo} from '@/utils/game/cooking/extraTasty/default';

// Intentionally keeping this as integer for easier calculation regarding extra tasty rate
export const extraTastyBasePercent: {
  [timing in ExtraTastyTiming]: number
} = {
  weekday: 10,
  weekend: 30,
};

export const extraTastyMultiplier: {
  [timing in ExtraTastyTiming]: number
} = {
  weekday: 2,
  weekend: 3,
};

export const extraTastySkillPercentMax = 70;

export const defaultExtraTastyInfo: ExtraTastyInfo = generateDefaultExtraTastyInfo();
