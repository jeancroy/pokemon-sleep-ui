import {getPatreonMember} from '@/handler/activation/check/patreon/api/member/main';
import {
  getActivationFromPatreonMember,
  GetActivationFromPatreonMemberOpts,
} from '@/handler/activation/check/patreon/getActivation';
import {ActivationSendingPayload} from '@/handler/activation/send/type';
import {isPatronActive} from '@/utils/external/patreon';
import {getActivationExpiryFromPatreon} from '@/utils/user/activation/utils';


export const toActivationPayloadFromPatreon = async (
  opts: GetActivationFromPatreonMemberOpts,
): Promise<ActivationSendingPayload> => {
  const {subscriber} = opts;
  const {id, attributes} = subscriber;
  const {email} = attributes;

  if (!isPatronActive(subscriber)) {
    return {
      contact: email,
      email,
      activationProperties: null,
      ignoreOnSend: true,
    };
  }

  const memberData = await getPatreonMember({userId: id});
  const social = memberData.included[0].attributes.social_connections;

  const {
    activation,
    isSuspended,
    existedActivationProperties,
  } = await getActivationFromPatreonMember(opts);
  const commonPayload: Pick<ActivationSendingPayload, 'contact' | 'email' | 'ignoreOnSend'> = {
    contact: email,
    email,
    ignoreOnSend: isSuspended,
  };

  if (!activation) {
    return {activationProperties: null, ...commonPayload};
  }

  return {
    activationProperties: {
      ...existedActivationProperties,
      expiry: getActivationExpiryFromPatreon(subscriber),
      activation,
      source: 'patreon',
      contact: {
        // Keep the existed ones except `patreon` to make sure the reference used for polling is correct
        ...existedActivationProperties?.contact,
        patreon: email,
        ...(social?.discord && {discord: social.discord.user_id}),
      },
      note: '',
    },
    ...commonPayload,
  };
};
