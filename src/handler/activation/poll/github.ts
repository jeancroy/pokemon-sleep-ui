import {getActivationPresetLookupOfSource} from '@/controller/user/activation/preset';
import {getAllActivationsOfSource} from '@/controller/user/activation/util';
import {getGithubSponsorships} from '@/handler/activation/check/github/api';
import {toActivationPayloadFromGithub} from '@/handler/activation/check/github/utils';
import {scanGithubActivationInDatabase} from '@/handler/activation/poll/scan/github/activation';
import {scanGithubSponsors} from '@/handler/activation/poll/scan/github/member';
import {scanActivations} from '@/handler/activation/poll/scan/main';
import {mergeScanResult} from '@/handler/activation/poll/scan/utils';
import {actionSendActivationEmail} from '@/handler/activation/send/email';


export const callGithubActivationPoll = async () => {
  const [
    members,
    activations,
    presetLookup,
  ] = await Promise.all([
    getGithubSponsorships(),
    getAllActivationsOfSource('github'),
    getActivationPresetLookupOfSource('github'),
  ]);

  return scanActivations({
    source: 'github',
    data: mergeScanResult({
      results: [
        scanGithubSponsors({members, activations}),
        scanGithubActivationInDatabase({members, activations}),
      ],
      getId: ({user}) => user.login,
    }),
    toPayload: async ({member}) => await toActivationPayloadFromGithub({
      data: member,
      presetLookup,
    }),
    toSendActivationActions: (payloads, sourceText) => payloads.map(async (payload) => (
      actionSendActivationEmail({
        payload: await payload,
        sourceNote: `Activation Poll (${sourceText})`,
        getWarnOnNullActivation: ({contact, email}) => `${sourceText} member is inactive for @${contact} (${email})`,
      })),
    ),
  });
};
