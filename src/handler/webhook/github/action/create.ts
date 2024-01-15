import {getActivationPresetLookupOfSource} from '@/controller/user/activation/preset';
import {toActivationPayloadFromGithub} from '@/handler/activation/check/github/utils';
import {actionSendActivationEmail} from '@/handler/activation/send/email';
import {GithubWebhookPayload} from '@/types/subscription/github/webhook';
import {toGithubSponsorData} from '@/utils/external/github';


export const handleGithubSponsorCreated = async (payload: GithubWebhookPayload) => {
  const presetLookup = await getActivationPresetLookupOfSource('github');

  return actionSendActivationEmail({
    payload: await toActivationPayloadFromGithub({
      data: toGithubSponsorData(payload),
      presetLookup,
    }),
    sourceNote: 'Github Webhook',
    getWarnOnNullActivation: ({contact}) => `Github sponsor is inactive for ID: ${contact}`,
  });
};
