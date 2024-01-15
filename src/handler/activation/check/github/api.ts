import {GithubApiSponsorshipResponse} from '@/types/subscription/github/api/sponsorship';
import {GithubSponsorData} from '@/types/subscription/github/data';
import {getActivationExpiryOfDefault} from '@/utils/user/activation/utils';


export const getGithubSponsorships = async (cursor?: string): Promise<GithubSponsorData[]> => {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.EXTERNAL_GITHUB_PAT}`,
    },
    body: JSON.stringify({
      query: /* GraphQL */ `
        {
          user(login: "raenonx") {
            sponsorshipsAsMaintainer(
              first: 100, 
              includePrivate: true,
              activeOnly: true,
              after: "${cursor ?? ''}",
            ) {
              nodes {
                sponsorEntity {
                  ... on User {
                    login
                    email
                  }
                }
                tier {
                  id
                  name
                  monthlyPriceInCents
                }
              }
              pageInfo {
                endCursor
                hasNextPage
              }
            }
          }
        }
      `,
    }),
  });

  const responseJson = (await response.json()) as GithubApiSponsorshipResponse;
  const data = responseJson.data?.user.sponsorshipsAsMaintainer;
  if (!data) {
    throw new Error(`Received empty query response: ${JSON.stringify(responseJson)}`);
  }

  const {nodes, pageInfo} = data;

  return [
    ...(pageInfo.hasNextPage ? await getGithubSponsorships(pageInfo.endCursor) : []),
    ...nodes.map(({sponsorEntity, tier}): GithubSponsorData => ({
      user: sponsorEntity,
      expiry: getActivationExpiryOfDefault(),
      tier,
    })),
  ];
};
