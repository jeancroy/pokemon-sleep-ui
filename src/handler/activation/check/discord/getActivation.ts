import {ActivationGetterOpts, ActivationGettingResult} from '@/handler/activation/check/common/getActivation/type';
import {getActivationFromPlatform} from '@/handler/activation/check/common/getActivation/utils';
import {DiscordSubscriber} from '@/types/subscription/discord/data';
import {toDiscordSubscriberInfo} from '@/utils/external/discord';


export type GetActivationFromDiscordSubscriberOpts = ActivationGetterOpts<DiscordSubscriber>;

export const getActivationFromDiscordSubscriber = ({
  subscriber,
  ...opts
}: GetActivationFromDiscordSubscriberOpts): Promise<ActivationGettingResult> => {
  const {roleId, userId} = subscriber;

  return getActivationFromPlatform({
    tag: roleId,
    userInfo: toDiscordSubscriberInfo(subscriber),
    source: 'discord',
    contact: userId,
    ...opts,
  });
};
