import {getActivationPresetLookupOfSource} from '@/controller/user/activation/preset';
import {toActivationPayloadFromPatreon} from '@/handler/activation/check/patreon/utils';
import {actionSendActivationEmail} from '@/handler/activation/send/email';
import {PatreonWebhookPayload} from '@/types/subscription/patreon/webhook';


export const handlePatreonPledgeCreated = async (
  payload: PatreonWebhookPayload,
) => {
  const presetLookup = await getActivationPresetLookupOfSource('patreon');

  return actionSendActivationEmail({
    payload: await toActivationPayloadFromPatreon({member: payload.data, presetLookup}),
    sourceNote: 'Patreon Webhook',
    getWarnOnNullActivation: ({contact}) => `Patreon member is inactive for email: ${contact}`,
  });
};
