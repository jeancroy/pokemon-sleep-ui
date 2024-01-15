import {ActivationSendingCommonOpts, ActivationSendingPayload} from '@/handler/activation/send/type';
import {toActivationLinkFromSendingPayload} from '@/handler/activation/send/utils';
import {isProduction} from '@/utils/environment';
import {sendActivationEmail} from '@/utils/user/activation/email';


type ActionSendActivationEmailOpts = ActivationSendingCommonOpts & {
  payload: ActivationSendingPayload,
};

export const actionSendActivationEmail = async (opts: ActionSendActivationEmailOpts) => {
  const {payload, sourceNote} = opts;
  const {email} = payload;

  if (!email) {
    console.warn(`Failed to send activation email as email is null (${sourceNote})`);
    return;
  }

  const activationLink = await toActivationLinkFromSendingPayload(opts);

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
