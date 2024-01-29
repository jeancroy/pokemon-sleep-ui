export const staminaRecoveryStrategies = [
  'optimistic',
  'conservative',
] as const;

export type StaminaRecoveryStrategy = typeof staminaRecoveryStrategies[number];
