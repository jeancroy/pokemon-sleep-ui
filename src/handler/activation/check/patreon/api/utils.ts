export const sendPatreonApiRequest = (url: string) => fetch(
  url,
  {
    headers: {
      authorization: `Bearer ${process.env.EXTERNAL_PATREON_OAUTH_ACCESS_TOKEN}`,
    },
  },
);
