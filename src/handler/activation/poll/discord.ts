import {getActivationPresetLookupOfSource} from '@/controller/user/activation/preset';
import {getAllActivationsOfSource} from '@/controller/user/activation/util';
import {getDiscordSubscribers} from '@/handler/activation/check/discord/api';
import {toActivationPayloadFromDiscord} from '@/handler/activation/check/discord/utils';
import {scanDiscordActivationInDatabase} from '@/handler/activation/poll/scan/discord/activation';
import {scanDiscordSubscribers} from '@/handler/activation/poll/scan/discord/member';
import {scanActivations} from '@/handler/activation/poll/scan/main';
import {mergeScanResult} from '@/handler/activation/poll/scan/utils';
import {actionSendActivationDiscordMessage} from '@/handler/activation/send/discord';


export const callDiscordActivationPoll = async () => {
  const [
    members,
    activations,
    presetLookup,
  ] = await Promise.all([
    getDiscordSubscribers(),
    getAllActivationsOfSource('discord'),
    getActivationPresetLookupOfSource('discord'),
  ]);

  return scanActivations({
    source: 'discord',
    data: mergeScanResult({
      results: [
        scanDiscordSubscribers({members, activations}),
        scanDiscordActivationInDatabase({members, activations}),
      ],
      getId: ({userId}) => userId,
    }),
    // Change payload
    toPayload: async ({member}) => await toActivationPayloadFromDiscord({
      member,
      presetLookup,
    }),
    toSendActivationActions: (payloads, sourceText) => [
      actionSendActivationDiscordMessage({
        payloads,
        sourceNote: `Activation Poll (${sourceText})`,
        getWarnOnNullActivation: ({contact}) => `Activation of ${contact} on ${sourceText} is null`,
      }),
    ],
  });
};
