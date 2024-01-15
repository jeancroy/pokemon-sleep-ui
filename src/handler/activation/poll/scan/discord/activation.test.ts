import {describe, expect, it} from '@jest/globals';

import {scanDiscordActivationInDatabase} from '@/handler/activation/poll/scan/discord/activation';
import {testDiscordMemberData} from '@/tests/data/activation/discord';
import {testActivations} from '@/tests/data/activation/generic';


describe('Discord Subscriber Poll / Scan Activation', () => {
  // Intentionally squashing all types of test into 1
  // because all types of matches/mismatches happen within a single list
  it('is correct', () => {
    const {
      toUpdateExpiry,
      toSendActivation,
      toDeactivate,
    } = scanDiscordActivationInDatabase({
      members: testDiscordMemberData,
      activations: testActivations,
    });

    expect(toUpdateExpiry).toHaveLength(0);
    expect(toSendActivation).toHaveLength(0);
    expect(toDeactivate[0].key).toBe('danglingDiscord');
    expect(toDeactivate).toHaveLength(1);
  });
});
