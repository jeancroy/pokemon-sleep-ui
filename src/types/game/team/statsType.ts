export const teamMemberStatsType = [
  'total',
  'berry',
  'ingredient',
  'cooking',
  'skill',
  'frequency',
  'energy',
  'inventory',
] as const;

export type TeamMemberStatsType = typeof teamMemberStatsType[number];
