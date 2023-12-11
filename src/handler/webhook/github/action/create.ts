import {getActivationPresetLookupOfSource} from '@/controller/user/activation/preset';
import {actionSendActivationEmail} from '@/handler/action/activation/email';
import {toActivationPayloadFromGithub} from '@/handler/shared/github/utils';
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
