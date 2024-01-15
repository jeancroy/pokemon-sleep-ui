import {generateActivationKey} from '@/controller/user/activation/key';
import {ActionSendActivationPayload} from '@/handler/activation/send/type';
import {isProduction} from '@/utils/environment';
import {sendActivationEmail} from '@/utils/user/activation/email';


type ActionSendActivationEmailOpts = {
  payload: ActionSendActivationPayload,
  sourceNote: string,
  getWarnOnNullActivation: (payload: ActionSendActivationPayload) => string,
};

export const actionSendActivationEmail = async ({
  payload,
  sourceNote,
  getWarnOnNullActivation,
}: ActionSendActivationEmailOpts) => {
  const {email, activationProperties} = payload;

  if (!activationProperties) {
    console.warn(`${getWarnOnNullActivation(payload)} (${sourceNote})`);
    return;
  }

  if (!email) {
    console.warn(`Failed to send activation email as email is null (${sourceNote})`);
    return;
  }

  const activationLink = await generateActivationKey({
    executorUserId: process.env.NEXTAUTH_ADMIN_UID,
    ...activationProperties,
  });

  // `activationLink` is null if the same source already have an active activation key
  if (!activationLink) {
    return;
  }

  // Production only to avoid accidental send
  if (isProduction()) {
    await sendActivationEmail({recipient: email, activationLink});
  }
  // eslint-disable-next-line no-console
  console.log(`Activation email sent to ${email} with link ${activationLink} (${sourceNote})`);
};
