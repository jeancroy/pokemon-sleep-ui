export const teamMemberStatsType = [
  'frequency',
  'inventory',
  'energy',
  'berry',
  'ingredient',
  'skill',
  'total',
] as const;

export type TeamMemberStatsType = typeof teamMemberStatsType[number];
