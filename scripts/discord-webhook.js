const {writeFile} = require('fs');


const env = {
  webhookUrl: 'AZ_DEVOPS_DISCORD_WEBHOOK',
  title: 'AZ_DEVOPS_TITLE',
  status: 'AZ_DEVOPS_STATUS',
  url: 'AZ_DEVOPS_BUILD_URL',
  requester: 'AZ_DEVOPS_REQUESTER',
  requesterId: 'AZ_DEVOPS_REQUESTER_ID',
  queuedBy: 'AZ_DEVOPS_QUEUED_BY',
  queuedById: 'AZ_DEVOPS_QUEUED_BY_ID',
};

for (const [key, variableName] of Object.entries(env)) {
  const value = process.env[variableName];

  if (!value) {
    throw new Error(`Invalid/Missing environment variable: ${variableName}`);
  }

  env[key] = value;
}

const jobStatusToColor = {
  Canceled: parseInt('06b6d4', 16),
  Succeeded: parseInt('22c55e', 16),
  SucceededWithIssues: parseInt('f59e0b', 16),
  Failed: parseInt('f43f5e', 16),
};

writeFile('devops-env.txt', JSON.stringify(env), (err) => {
  if (err) {
    console.error(err);
  }
});

const discordData = {
  timestamp: Date.now(),
  // `503484431437398016` is the UID of `@raenonx`
  content: `**${env.status}** / ${env.title} <@503484431437398016>`,
  embeds: [
    {
      'title': env.title,
      'color': jobStatusToColor[env.status] ?? parseInt('64748b', 16),
      'fields': [
        {
          'name': 'Status',
          'value': env.status,
          'inline': true,
        },
      ],
      'url': env.url,
    },
  ],
};

/* eslint-disable no-console */
console.info(`Azure DevOps triggered at ${discordData.timestamp}`);
console.info(`- Requester: ${env.requester}`);
console.info(`- Requester ID: ${env.requesterId}`);
console.info(`- Queued by: ${env.queuedBy}`);
console.info(`- Queued by ID: ${env.queuedById}`);
console.info(`- Status: ${env.status}`);
console.info(`- Title: ${env.title}`);
console.info(`- Content: ${discordData.content}`);
/* eslint-enable no-console */


fetch(
  env.webhookUrl,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(discordData),
  },
)
  .then(async (response) => {
    if (response.ok) {
      return;
    }

    throw new Error(`Discord returned ${response.status} - ${JSON.stringify(await response.json())}`);
  })
  .catch((e) => {
    console.error('Failed to send Azure DevOps Discord webhook notification', e);
    throw e;
  });
