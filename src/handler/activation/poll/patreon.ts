import {getActivationPresetLookupOfSource} from '@/controller/user/activation/preset';
import {getAllActivationsOfSource} from '@/controller/user/activation/utils';
import {getCurrentCampaignMembers} from '@/handler/activation/check/patreon/api/campaign/main';
import {toActivationPayloadFromPatreon} from '@/handler/activation/check/patreon/toPayload';
import {scanActivations} from '@/handler/activation/poll/scan/main';
import {scanPatreonActivationInDatabase} from '@/handler/activation/poll/scan/patreon/activation';
import {scanPatron} from '@/handler/activation/poll/scan/patreon/member';
import {mergeScanResult} from '@/handler/activation/poll/scan/utils';
import {actionSendActivationEmail} from '@/handler/activation/send/email';


export const callPatreonActivationPoll = async () => {
  const [
    members,
    activations,
    presetLookup,
  ] = await Promise.all([
    getCurrentCampaignMembers(),
    getAllActivationsOfSource('patreon'),
    getActivationPresetLookupOfSource('patreon'),
  ]);

  return scanActivations({
    source: 'patreon',
    data: mergeScanResult({
      results: [
        scanPatron({members, activations}),
        scanPatreonActivationInDatabase({members, activations}),
      ],
      getId: ({member}) => member.id,
    }),
    toPayload: async ({member}) => await toActivationPayloadFromPatreon({
      subscriber: member.member,
      presetLookup,
    }),
    toSendActivationActions: (payloads, sourceText) => payloads.map(async (payload) => (
      actionSendActivationEmail({
        payload: await payload,
        sourceNote: `Activation Poll (${sourceText})`,
      })),
    ),
  });
};
