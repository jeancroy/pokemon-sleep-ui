import {patreonSearchParams} from '@/handler/activation/check/patreon/api/const';
import {PatreonMemberResponse} from '@/handler/activation/check/patreon/api/member/type';
import {sendPatreonApiRequest} from '@/handler/activation/check/patreon/api/utils';


type GetPatreonMemberOpts = {
  userId: string,
};

export const getPatreonMember = async ({userId}: GetPatreonMemberOpts): Promise<PatreonMemberResponse> => {
  const response = await sendPatreonApiRequest(
    `https://www.patreon.com/api/oauth2/v2/members/${userId}?${patreonSearchParams.toString()}`,
  );

  return await response.json() as PatreonMemberResponse;
};
