import {ActivationGetterOpts, ActivationGettingResult} from '@/handler/activation/check/common/getActivation/type';
import {getActivationFromPlatform} from '@/handler/activation/check/common/getActivation/utils';
import {GithubSponsorData} from '@/types/subscription/github/data';
import {toGithubSponsorInfo} from '@/utils/external/github';


export type GetActivationFromGithubSponsorOpts = ActivationGetterOpts<GithubSponsorData>;

export const getActivationFromGithubSponsor = ({
  subscriber,
  ...opts
}: GetActivationFromGithubSponsorOpts): Promise<ActivationGettingResult> => {
  const {tier, user} = subscriber;

  return getActivationFromPlatform({
    tag: tier.id,
    userInfo: toGithubSponsorInfo(user),
    source: 'github',
    contact: user.login,
    ...opts,
  });
};
