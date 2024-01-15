import {describe, expect, it} from '@jest/globals';

import {scanDiscordSubscribers} from '@/handler/activation/poll/scan/discord/member';
import {testDiscordMemberData} from '@/tests/data/activation/discord';
import {testActivations} from '@/tests/data/activation/generic';


describe('Discord Subscriber Poll / Scan Subscribers', () => {
  // Intentionally squashing all types of test into 1
  // because all types of matches/mismatches happen within a single list
  it('is correct', () => {
    const {
      toUpdateExpiry,
      toSendActivation,
      toDeactivate,
    } = scanDiscordSubscribers({
      members: testDiscordMemberData,
      activations: testActivations,
    });

    expect(toSendActivation[0].userId).toBe('discordNoActivationId');
    expect(toSendActivation).toHaveLength(1);
    expect(toUpdateExpiry[0].userId).toBe('discordPendingId');
    expect(toUpdateExpiry[1].userId).toBe('discordActiveId');
    expect(toUpdateExpiry).toHaveLength(2);
    expect(toDeactivate).toHaveLength(0);
  });
});
