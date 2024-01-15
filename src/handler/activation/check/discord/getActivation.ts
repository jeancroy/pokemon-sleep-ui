import {ActivationStatus} from '@/types/mongo/activation';
import {ActivationPresetLookup} from '@/types/mongo/activationPreset';
import {DiscordSubscriber} from '@/types/subscription/discord/data';
import {toDiscordSubscriberInfo} from '@/utils/external/discord';


export type GetActivationFromDiscordSubscriberOpts = {
  member: DiscordSubscriber,
  presetLookup: ActivationPresetLookup,
};

export const getActivationFromDiscordSubscriber = ({
  member,
  presetLookup,
}: GetActivationFromDiscordSubscriberOpts): ActivationStatus | null => {
  const {roleId} = member;

  const activation = presetLookup[roleId];
  if (!activation) {
    console.warn(
      `Role ID ${roleId} on user ${toDiscordSubscriberInfo(member)} on Discord without associated activation`,
    );

    return null;
  }

  return activation.activation;
};
