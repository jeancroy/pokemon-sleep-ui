import {ActivationStatus} from '@/types/mongo/activation';
import {ActivationPresetLookup} from '@/types/mongo/activationPreset';
import {GithubSponsorData} from '@/types/subscription/github/data';
import {toGithubSponsorInfo} from '@/utils/external/github';


export type GetActivationFromGithubSponsorOpts = {
  data: GithubSponsorData,
  presetLookup: ActivationPresetLookup,
};

export const getActivationFromGithubSponsor = ({
  data,
  presetLookup,
}: GetActivationFromGithubSponsorOpts): ActivationStatus | null => {
  const {tier, user} = data;
  const tierId = tier.id;

  const activation = presetLookup[tierId];
  if (!activation) {
    console.warn(
      `Tier ID ${tierId} on user ${toGithubSponsorInfo(user)} on Github without associated activation`,
    );
    return null;
  }

  return activation.activation;
};
