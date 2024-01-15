import {generateActivationKey} from '@/controller/user/activation/key';
import {ActivationSendingCommonOpts, ActivationSendingPayload} from '@/handler/activation/send/type';


type ToActivationLinkFromSendingPayloadOpts = ActivationSendingCommonOpts & {
  payload: ActivationSendingPayload
};

export const toActivationLinkFromSendingPayload = async ({
  payload,
  sourceNote,
}: ToActivationLinkFromSendingPayloadOpts): Promise<string | null> => {
  const {
    activationProperties,
    ignoreOnSend,
    contact,
    email,
  } = payload;

  if (!activationProperties) {
    console.warn(`Activation of [${contact}] (Email: ${email}) on ${sourceNote} is null`);
    return null;
  }

  if (ignoreOnSend) {
    console.warn(`Activation of [${contact}] (Email: ${email}) on ${sourceNote} has ignoreOnSend flag`);
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

  return link;
};
