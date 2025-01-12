import {EfficiencyBreakPoint} from '@/types/game/producing/efficiency';
import {StaminaEfficiencyState} from '@/types/game/stamina/efficiency';
import {StaminaEventType} from '@/types/game/stamina/event';
import {StaminaRecoveryStrategy} from '@/types/game/stamina/strategy';
import {I18nMessageKeysOfNamespace} from '@/types/i18n';


export const staminaMaxRecovery = 100;

export const staminaAbsoluteMax = 150;

export const staminaDepleteInterval = 600;

export const maxSleepEffectiveDuration = 8.5 * 3600; // 8.5 hrs

export const staminaRecoveryInterval = maxSleepEffectiveDuration / 100;

export const staminaStrategyI18nId: {
  [strategy in StaminaRecoveryStrategy]: I18nMessageKeysOfNamespace<'UI.Stamina.Strategy'>
} = {
  optimistic: 'Optimistic',
  conservative: 'Conservative',
};

export const staminaLevelImageSrc: {[breakPoint in EfficiencyBreakPoint]: string} = {
  80: '/images/mood/80.png',
  60: '/images/mood/60.png',
  40: '/images/mood/40.png',
  20: '/images/mood/20.png',
  0: '/images/mood/0.png',
};

export const staminaEventTypeI18nId: {
  [eventType in StaminaEventType]: I18nMessageKeysOfNamespace<'UI.Stamina.EventType'>
} = {
  skillRecovery: 'SkillRecovery',
  cookingRecovery: 'CookingRecovery',
  efficiencyBlock: 'EfficiencyBlock',
  sleep: 'Sleep',
  wakeup: 'Wakeup',
  endOfPeriod: 'EndOfPeriod',
};

export const staminaEfficiencyStateI18nId: {
  [state in StaminaEfficiencyState]: I18nMessageKeysOfNamespace<'UI.Stamina.State'>
} = {
  average: 'Average',
  awake: 'Awake',
  sleep1: 'Asleep.Primary',
  sleep2: 'Asleep.Secondary',
};
