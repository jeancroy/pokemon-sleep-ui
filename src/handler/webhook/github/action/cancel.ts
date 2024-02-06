import {removeActivationSingle} from '@/controller/user/activation/utils';
import {ActivationContact} from '@/types/mongo/activation';
import {GithubWebhookPayload} from '@/types/subscription/github/webhook';


export const handleGithubSponsorCancelled = async (payload: GithubWebhookPayload) => {
  const sponsor = payload.sponsorship.sponsor;
  if (!sponsor) {
    throw new Error('No associated sponsor info available while removing Github sponsor activation');
  }

  await removeActivationSingle({
    filter: {[`contact.${'github' satisfies ActivationContact}`]: sponsor.login.toString()},
  });
};
