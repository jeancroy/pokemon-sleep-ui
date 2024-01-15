import {getActivationPropertiesByContact} from '@/controller/user/activation/util';
import {
  getActivationFromDiscordSubscriber,
  GetActivationFromDiscordSubscriberOpts,
} from '@/handler/activation/check/discord/getActivation';
import {ActionSendActivationPayload} from '@/handler/activation/send/type';
import {toDiscordSubscriberInfo} from '@/utils/external/discord';
import {getActivationExpiryOfDefault} from '@/utils/user/activation/utils';


export const toActivationPayloadFromDiscord = async (
  opts: GetActivationFromDiscordSubscriberOpts,
): Promise<ActionSendActivationPayload> => {
  const {member} = opts;
  const {userId} = member;

  const existedActivationProperties = (await getActivationPropertiesByContact({
    source: 'discord',
    contact: userId,
  }));

  /* eslint-disable no-console */
  console.log(`>>> Converting Discord member of ${toDiscordSubscriberInfo(member)} to activation payload`);
  if (existedActivationProperties) {
    console.log(
      `Existing activation properties of ${toDiscordSubscriberInfo(member)} on Discord:`,
      JSON.stringify(existedActivationProperties),
    );
  }
  /* eslint-enable no-console */

  let activation = existedActivationProperties?.activation ?? null;
  if (!existedActivationProperties?.isActivationLocked) {
    activation = getActivationFromDiscordSubscriber(opts);
  }

  if (!activation) {
    return {contact: userId, email: null, activationProperties: null};
  }

  return {
    contact: userId,
    email: null,
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
  };
};
