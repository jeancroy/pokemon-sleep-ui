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

    /* eslint-disable no-console */
    console.info(`User of ${email} on Patreon has an unentitled tier [${activeTier.id}]`);
    /* eslint-enable no-console */
  }

  /* eslint-disable no-console */
  console.info(`User of ${email} on Patreon does not seem to have entitled tiers`);
  /* eslint-enable no-console */
  return {
    activation: null,
    isSuspended: false,
    existedActivationProperties: null,
  };
};
