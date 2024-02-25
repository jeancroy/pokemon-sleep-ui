import {getPatreonSecrets, updatePatreonSecrets} from '@/controller/secrets/patreon';
import {PatreonTokenRefreshResponse} from '@/types/subscription/patreon/secrets';


export const refreshAccessToken = async () => {
  const secrets = await getPatreonSecrets();

  if (!secrets) {
    throw new Error('Unable to refresh access token - secrets not available');
  }

  const params = new URLSearchParams();

  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', secrets.refreshToken);
  params.append('client_id', process.env.EXTERNAL_PATREON_OAUTH_CLIENT_ID);
  params.append('client_secret', process.env.EXTERNAL_PATREON_OAUTH_CLIENT_SECRET);

  const response = await fetch(
    `https://www.patreon.com/api/oauth2/token?${params.toString()}`,
    {method: 'POST'},
  );
  const responseObj = await response.json();

  if ('error' in responseObj) {
    throw new Error(
      `Unable to refresh access token - invalid grant (likely incorrect refresh token) ${responseObj.error}`,
    );
  }

  const data = responseObj as PatreonTokenRefreshResponse;

  console.info(`Patreon secrets refreshed`);
  await updatePatreonSecrets({
    tokenType: data.token_type,
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
  });
};
