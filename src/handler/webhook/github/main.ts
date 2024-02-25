import {handleGithubSponsorCancelled} from '@/handler/webhook/github/action/cancel';
import {handleGithubSponsorCreated} from '@/handler/webhook/github/action/create';
import {handleGithubSponsorUpdated} from '@/handler/webhook/github/action/update';
import {githubHeaderEventType, githubHeaderKeyOfSignature} from '@/handler/webhook/github/const';
import {throwIfGithubSignatureFailed} from '@/handler/webhook/github/utils';
import {GithubWebhookPayload} from '@/types/subscription/github/webhook';


export const handleGithubWebhook = async (request: Request) => {
  const message = await request.text();

  await throwIfGithubSignatureFailed({
    message,
    expected: request.headers.get(githubHeaderKeyOfSignature),
  });

  const webhookEvent = request.headers.get(githubHeaderEventType);
  if (webhookEvent === 'ping') {
    return Response.json({}, {status: 200});
  }

  if (webhookEvent !== 'sponsorship') {
    throw new Error(`Received mismatched Github webhook event type: ${webhookEvent} (Message: ${message})`);
  }

  const messageObj = JSON.parse(message) as GithubWebhookPayload;
  const action = messageObj.action;

  console.info('Github Webhook action:', action);
  console.info('Github Webhook message received:', message);

  if (!action) {
    return Response.json({}, {status: 400});
  }

  if (action === 'created') {
    await handleGithubSponsorCreated(messageObj);

    return Response.json(null, {status: 200});
  }

  if (action === 'cancelled') {
    await handleGithubSponsorCancelled(messageObj);

    return Response.json(null, {status: 200});
  }

  if (action === 'tier_changed' || action === 'pending_cancellation') {
    await handleGithubSponsorUpdated(messageObj);

    return Response.json(null, {status: 200});
  }

  console.error(`Unhandled Github webhook trigger: ${action satisfies never}`);
  return Response.json({}, {status: 400});
};
