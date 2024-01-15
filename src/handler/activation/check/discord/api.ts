import {DiscordSubscriber} from '@/types/subscription/discord/data';


export const getDiscordSubscribers = async (): Promise<DiscordSubscriber[]> => {
  const response = await fetch(process.env.SUBSCRIPTION_DISCORD_SOURCE_URL);

  return await response.json() as DiscordSubscriber[];
};
