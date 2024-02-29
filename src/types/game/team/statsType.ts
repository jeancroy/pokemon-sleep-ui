export const teamMemberStatsType = [
  'total',
  'berry',
  'ingredient',
  'skill',
  'frequency',
  'energy',
  'inventory',
] as const;

export type TeamMemberStatsType = typeof teamMemberStatsType[number];
