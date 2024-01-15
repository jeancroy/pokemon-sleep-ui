import {ActivationGetterOpts, ActivationGettingResult} from '@/handler/activation/check/common/getActivation/type';
import {getActivationFromPlatform} from '@/handler/activation/check/common/getActivation/utils';
import {PatreonMember} from '@/types/subscription/patreon/common/member';


export type GetActivationFromPatreonMemberOpts = ActivationGetterOpts<PatreonMember>;

export const getActivationFromPatreonMember = async ({
  subscriber,
  ...opts
}: GetActivationFromPatreonMemberOpts): Promise<ActivationGettingResult> => {
  const email = subscriber.attributes.email;
  const activeTier = subscriber.relationships.currently_entitled_tiers.data.at(0);
  if (!activeTier) {
    /* eslint-disable no-console */
    console.log(`User of ${email} on Patreon does not seem to have entitled tiers`);
    /* eslint-enable no-console */

    return {
      activation: null,
      isSuspended: false,
      existedActivationProperties: null,
    };
  }

  return await getActivationFromPlatform({
    tag: activeTier.id,
    userInfo: email,
    source: 'patreon',
    contact: email,
    ...opts,
  });
};
