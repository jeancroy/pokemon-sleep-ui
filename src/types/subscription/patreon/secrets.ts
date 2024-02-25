export type PatreonSecretsData = {
  tokenType: string,
  accessToken: string,
  refreshToken: string,
};

export type PatreonTokenRefreshResponse = {
  access_token: string,
  refresh_token: string,
  // In unit of seconds, usually 2678400
  expires_in: number,
  // `Bearer`
  token_type: string,
  // Scopes separated with space. Known scopes are
  // - identity
  // - w:campaigns.benefits
  // - campaigns.members
  // - campaigns.members.address
  // - campaigns.members[email]
  // - campaigns.posts
  // - w:campaigns.posts
  // - w:campaigns.webhook
  // - campaigns.webhook
  // - campaigns
  // - w:campaigns.apps
  // - apps.tiers identity[email]
  // - identity.memberships
  // - w:identity.clients
  scope: string,
  // Seems to be fixed `0.0.1`
  version: string,
};
