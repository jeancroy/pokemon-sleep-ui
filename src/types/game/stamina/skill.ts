export type StaminaSkillTriggerData = {
  dailyCount: number,
  amount: number,
};

export type StaminaSkillTriggerOverride = {
  type: 'override' | 'attach',
  triggers: StaminaSkillTriggerData[],
};

export type StaminaSkillRecoveryConfig = {
  recovery: StaminaSkillTriggerData,
};
