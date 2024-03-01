export type MainSkillId = number;

export type MainSkillTarget = 'random' | 'self' | 'team';

export type MainSkillEffectAtLevel = {
  type: 'strength' | 'shards',
  value: number,
  range?: never,
} | {
  type: 'strength' | 'shards',
  value?: never,
  range: {
    from: number,
    to: number,
  },
} | {
  type: 'stamina',
  target: MainSkillTarget,
  value: number,
} | {
  type: 'help',
  count: number,
} | {
  type: 'cooking',
  ingredients: number,
  capacity?: never,
  successPercent?: never,
} | {
  type: 'cooking',
  ingredients?: never,
  capacity: number,
  successPercent?: never,
} | {
  type: 'cooking',
  ingredients?: never,
  capacity?: never,
  successPercent: number,
} | {
  type: 'random',
} | {
  type: 'unknown',
};

export type MainSkillEffectType = MainSkillEffectAtLevel['type'];

export type MainSkillEffect = MainSkillEffectAtLevel & {
  level: number,
};

export type MainSkillData = {
  id: MainSkillId,
  maxLevel: number,
  effects: MainSkillEffect[],
};

export type MainSkillMap = {[id in MainSkillId]: MainSkillData};

export type MainSkillLevel = number | 'max';
