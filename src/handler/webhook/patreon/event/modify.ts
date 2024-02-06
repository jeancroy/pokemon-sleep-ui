import {getActivationPresetLookupOfSource} from '@/controller/user/activation/preset';
import {removeActivationSingle, updateActivationPropertiesSingle} from '@/controller/user/activation/utils';
import {toActivationPayloadFromPatreon} from '@/handler/activation/check/patreon/toPayload';
import {ActivationContact} from '@/types/mongo/activation';
import {PatreonWebhookPayload} from '@/types/subscription/patreon/webhook';


export const handlePatreonPledgeModified = async (payload: PatreonWebhookPayload) => {
  const presetLookup = await getActivationPresetLookupOfSource('patreon');

  const {contact, activationProperties} = await toActivationPayloadFromPatreon({
    subscriber: payload.data,
    presetLookup,
  });

  if (!activationProperties) {
    await removeActivationSingle({
      filter: {[`contact.${'patreon' satisfies ActivationContact}`]: contact},
    });
    return;
  }

  await updateActivationPropertiesSingle({
    filter: {[`contact.${'patreon' satisfies ActivationContact}`]: contact},
    properties: activationProperties,
  });
};
