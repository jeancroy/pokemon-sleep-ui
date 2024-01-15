import {getActivationPropertiesByContact} from '@/controller/user/activation/util';
import {
  getActivationFromGithubSponsor,
  GetActivationFromGithubSponsorOpts,
} from '@/handler/activation/check/github/getActivation';
import {ActionSendActivationPayload} from '@/handler/activation/send/type';
import {toGithubSponsorInfo} from '@/utils/external/github';


export const toActivationPayloadFromGithub = async (
  opts: GetActivationFromGithubSponsorOpts,
): Promise<ActionSendActivationPayload> => {
  const {data} = opts;
  const {user, expiry} = data;

  const contact = user.login;
  // `user.email` might be an empty string
  const email = user.email || null;
  const existedActivationProperties = (await getActivationPropertiesByContact({
    source: 'github',
    contact,
  }));

  /* eslint-disable no-console */
  console.log(`>>> Converting Github sponsor info of ${toGithubSponsorInfo(user)} to activation payload`);
  if (existedActivationProperties) {
    console.log(
      `Existing activation properties of ${toGithubSponsorInfo(user)} on Github:`,
      JSON.stringify(existedActivationProperties),
    );
  }
  /* eslint-enable no-console */

  const activation = getActivationFromGithubSponsor(opts);
  if (!activation) {
    return {contact, email, activationProperties: null};
  }

  return {
    contact: user.login,
    email,
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
  };
};
