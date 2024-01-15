import {getActivationPropertiesByContact} from '@/controller/user/activation/util';
import {getPatreonMember} from '@/handler/activation/check/patreon/api/member/main';
import {
  getActivationFromPatreonMember,
  GetActivationFromPatreonMemberOpts,
} from '@/handler/activation/check/patreon/getActivation';
import {ActionSendActivationPayload} from '@/handler/activation/send/type';
import {isPatronActive} from '@/utils/external/patreon';
import {getActivationExpiryFromPatreon} from '@/utils/user/activation/utils';


export const toActivationPayloadFromPatreon = async (
  opts: Omit<GetActivationFromPatreonMemberOpts, 'email'>,
): Promise<ActionSendActivationPayload> => {
  const {member} = opts;
  const {id, attributes} = member;
  const {email} = attributes;

  if (!isPatronActive(member)) {
    return {contact: email, email, activationProperties: null};
  }

  const memberData = await getPatreonMember({userId: id});

  const social = memberData.included[0].attributes.social_connections;
  const existedActivationProperties = (await getActivationPropertiesByContact({
    source: 'patreon',
    contact: email,
  }));

  /* eslint-disable no-console */
  console.log(`>>> Converting Patreon member of ${id} (${email}) to activation payload`);
  if (existedActivationProperties) {
    console.log(
      `Existing activation properties of ${email} on Patreon:`,
      JSON.stringify(existedActivationProperties),
    );
  }
  /* eslint-enable no-console */

  const activation = getActivationFromPatreonMember({email, ...opts});
  if (!activation) {
    return {contact: email, email, activationProperties: null};
  }

  return {
    contact: email,
    email,
    activationProperties: {
      ...existedActivationProperties,
      expiry: getActivationExpiryFromPatreon(member),
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
  };
};
