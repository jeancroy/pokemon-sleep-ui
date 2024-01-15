import {generateActivationKey} from '@/controller/user/activation/key';
import {ActionSendActivationPayload} from '@/handler/activation/send/type';
import {DiscordActivationMessage} from '@/types/subscription/discord/request';
import {isProduction} from '@/utils/environment';
import {isNotNullish} from '@/utils/type';
import {sendDiscordActivationMessages} from '@/utils/user/activation/discord';


type ActionSendActivationDiscordMessageOpts = {
  payloads: Promise<ActionSendActivationPayload>[],
  sourceNote: string,
  getWarnOnNullActivation: (payload: ActionSendActivationPayload) => string,
};

export const actionSendActivationDiscordMessage = async ({
  payloads,
  sourceNote,
  getWarnOnNullActivation,
}: ActionSendActivationDiscordMessageOpts) => {
  const activationMessages: DiscordActivationMessage[] = (
    await Promise.all(payloads.map(async (payload) => {
      const resolvedPayload = await payload;
      const {contact, activationProperties} = resolvedPayload;

      if (!activationProperties) {
        console.warn(`${getWarnOnNullActivation(resolvedPayload)} (${sourceNote})`);
        return null;
      }

      const link = await generateActivationKey({
        executorUserId: process.env.NEXTAUTH_ADMIN_UID,
        ...activationProperties,
      });

      // `link` is null if the same source already have an active activation key
      if (!link) {
        return null;
      }

      return {
        userId: contact,
        link,
      };
    }))
  )
    .filter(isNotNullish);

  // Production only to avoid accidental send
  if (isProduction()) {
    await sendDiscordActivationMessages({activationMessages});
  }
  // eslint-disable-next-line no-console
  console.log(`Activation Discord message (${activationMessages.length}) requested (${sourceNote})`);
};
