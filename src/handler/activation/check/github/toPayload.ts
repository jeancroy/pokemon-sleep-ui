import {
  getActivationFromGithubSponsor,
  GetActivationFromGithubSponsorOpts,
} from '@/handler/activation/check/github/getActivation';
import {ActivationSendingPayload} from '@/handler/activation/send/type';


export const toActivationPayloadFromGithub = async (
  opts: GetActivationFromGithubSponsorOpts,
): Promise<ActivationSendingPayload> => {
  const {subscriber} = opts;
  const {user, expiry} = subscriber;

  const contact = user.login;
  // `user.email` might be an empty string
  const email = user.email || null;

  const {
    activation,
    isSuspended,
    existedActivationProperties,
  } = await getActivationFromGithubSponsor(opts);
  const commonPayload: Pick<ActivationSendingPayload, 'contact' | 'email' | 'ignoreOnSend'> = {
    contact,
    email,
    ignoreOnSend: isSuspended,
  };
  if (!activation) {
    return {activationProperties: null, ...commonPayload};
  }

  return {
    activationProperties: {
      ...existedActivationProperties,
      expiry,
      activation,
      source: 'github',
      contact: {
        ...existedActivationProperties?.contact,
        // Keep the existed ones except `github` to make sure the reference used for polling is correct
        github: contact,
      },
      note: !!user.email ? `Email: ${user.email}` : '',
    },
    ...commonPayload,
  };
};
