import {ActivationSendingCommonOpts, ActivationSendingPayload} from '@/handler/activation/send/type';
import {toActivationLinkFromSendingPayload} from '@/handler/activation/send/utils';
import {DiscordActivationMessage} from '@/types/subscription/discord/request';
import {isProduction} from '@/utils/environment';
import {isNotNullish} from '@/utils/type';
import {sendDiscordActivationMessages} from '@/utils/user/activation/discord';


type ActionSendActivationDiscordMessageOpts = ActivationSendingCommonOpts & {
  payloads: Promise<ActivationSendingPayload>[],
};

export const actionSendActivationDiscordMessage = async ({
  payloads,
  ...opts
}: ActionSendActivationDiscordMessageOpts) => {
  const {sourceNote} = opts;

  const activationMessages: DiscordActivationMessage[] = (
    await Promise.all(payloads.map(async (unresolvedPayload) => {
      const payload = await unresolvedPayload;

      const link = await toActivationLinkFromSendingPayload({
        payload: await unresolvedPayload,
        ...opts,
      });

      // `link` is null if the same source already have an active activation key
      if (!link) {
        return null;
      }

      return {userId: payload.contact, link};
    }))
  ).filter(isNotNullish);

  // Production only to avoid accidental send
  if (isProduction()) {
    await sendDiscordActivationMessages({activationMessages});
  }

  // eslint-disable-next-line no-console
  console.log(`Activation Discord message (${activationMessages.length}) requested (${sourceNote})`);
};
