export type StaminaEventType = 'skillRecovery' | 'efficiencyBlock' | 'sleep' | 'wakeup' | 'endOfPeriod';

export type StaminaAtEvent = {
  before: number,
  after: number,
};

export type StaminaEventLog = {
  timing: number,
  type: StaminaEventType,
  // `stamina` is whatever actually shown in game
  stamina: StaminaAtEvent,
  // `staminaUnderlying` could go negative, for calculation purposes
  staminaUnderlying: StaminaAtEvent,
};

export type StaminaEventLogFlattened = Omit<StaminaEventLog, 'stamina' | 'staminaUnderlying' | 'type'> & {
  stamina: number,
  staminaUnderlying: number,
  type: StaminaEventType | null,
  efficiency: number,
  isAsleep: boolean,
};
