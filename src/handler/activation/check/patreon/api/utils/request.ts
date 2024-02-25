import {getPatreonSecrets} from '@/controller/secrets/patreon';
import {refreshAccessToken} from '@/handler/activation/check/patreon/api/utils/refresh';


type SendPatreonApiRequestInternalOpts = {
  url: string,
  retried: boolean,
};

const sendPatreonApiRequestInternal = async <TResponse>({
  url,
  retried,
}: SendPatreonApiRequestInternalOpts): Promise<TResponse> => {
  const secrets = await getPatreonSecrets();

  if (!secrets) {
    throw new Error('Unable to send Patreon API request - secrets unavailable');
  }

  const response = await fetch(
    url,
    {
      headers: {
        authorization: `${secrets.tokenType} ${secrets.accessToken}`,
      },
    },
  );

  const responseJson = await response.json();

  if (response.status !== 200) {
    if (retried) {
      throw new Error(
        `Unable to send Patreon API request to [${url}] - ` +
        `Received status ${response.status} but failed to refresh token: ${responseJson}`,
      );
    }

    await refreshAccessToken();

    return sendPatreonApiRequestInternal({url, retried: true});
  }

  return responseJson;
};

export const sendPatreonApiRequest = async <TResponse>(url: string): Promise<TResponse> => {
  return sendPatreonApiRequestInternal<TResponse>({url, retried: false});
};
