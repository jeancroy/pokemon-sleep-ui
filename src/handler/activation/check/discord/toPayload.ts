import {
  getActivationFromDiscordSubscriber,
  GetActivationFromDiscordSubscriberOpts,
} from '@/handler/activation/check/discord/getActivation';
import {ActivationSendingPayload} from '@/handler/activation/send/type';
import {getActivationExpiryOfDefault} from '@/utils/user/activation/utils';


export const toActivationPayloadFromDiscord = async (
  opts: GetActivationFromDiscordSubscriberOpts,
): Promise<ActivationSendingPayload> => {
  const {subscriber} = opts;
  const {userId} = subscriber;

  const {
    activation,
    isSuspended,
    existedActivationProperties,
  } = await getActivationFromDiscordSubscriber(opts);
  const commonPayload: Pick<ActivationSendingPayload, 'contact' | 'email' | 'ignoreOnSend'> = {
    contact: userId,
    email: null,
    ignoreOnSend: isSuspended,
  };

  if (!activation) {
    return {activationProperties: null, ...commonPayload};
  }

  return {
    activationProperties: {
      ...existedActivationProperties,
      expiry: getActivationExpiryOfDefault(),
      activation,
      source: 'discord',
      contact: {
        // Keep the existed ones except `discord` to make sure the reference used for polling is correct
        ...existedActivationProperties?.contact,
        discord: userId,
      },
      note: '',
    },
    ...commonPayload,
  };
};
