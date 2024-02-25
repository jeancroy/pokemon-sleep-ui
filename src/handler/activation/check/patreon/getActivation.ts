import {ActivationGetterOpts, ActivationGettingResult} from '@/handler/activation/check/common/getActivation/type';
import {getActivationFromPlatform} from '@/handler/activation/check/common/getActivation/utils';
import {PatreonMember} from '@/types/subscription/patreon/common/member';


export type GetActivationFromPatreonMemberOpts = ActivationGetterOpts<PatreonMember>;

export const getActivationFromPatreonMember = async ({
  subscriber,
  ...opts
}: GetActivationFromPatreonMemberOpts): Promise<ActivationGettingResult> => {
  const email = subscriber.attributes.email;

  // `currently_entitled_tiers` could have some untracked tiers,
  // therefore loop through every tier and return the first activation
  for (const activeTier of subscriber.relationships.currently_entitled_tiers.data) {
    const activationGettingResult = await getActivationFromPlatform({
      tag: activeTier.id,
      userInfo: email,
      source: 'patreon',
      contact: email,
      ...opts,
    });

    if (activationGettingResult.activation) {
      return activationGettingResult;
    }

    console.info(`User of ${email} on Patreon has an unentitled tier [${activeTier.id}]`);
  }

  console.info(`User of ${email} on Patreon does not seem to have entitled tiers`);
  return {
    activation: null,
    isSuspended: false,
    existedActivationProperties: null,
  };
};
