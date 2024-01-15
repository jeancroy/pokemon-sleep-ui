import {ActivationStatus} from '@/types/mongo/activation';
import {ActivationPresetLookup} from '@/types/mongo/activationPreset';
import {PatreonMember} from '@/types/subscription/patreon/common/member';


export type GetActivationFromPatreonMemberOpts = {
  email: string,
  member: PatreonMember,
  presetLookup: ActivationPresetLookup,
};

export const getActivationFromPatreonMember = ({
  email,
  member,
  presetLookup,
}: GetActivationFromPatreonMemberOpts): ActivationStatus | null => {
  const activeTier = member.relationships.currently_entitled_tiers.data.at(0);
  if (!activeTier) {
    /* eslint-disable no-console */
    console.log(`User of ${email} on Patreon does not seem to have entitled tiers`);
    /* eslint-enable no-console */

    return null;
  }

  const activation = presetLookup[activeTier.id];
  if (!activation) {
    console.warn(
      `Tier ID ${activeTier.id} is on user of ${email} on Patreon, but no associated activation configured`,
    );

    return null;
  }

  return activation.activation;
};
