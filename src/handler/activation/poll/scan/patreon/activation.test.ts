import {describe, expect, it} from '@jest/globals';

import {scanPatreonActivationInDatabase} from '@/handler/activation/poll/scan/patreon/activation';
import {testActivations} from '@/tests/data/activation/generic';
import {testPatreonMemberData} from '@/tests/data/activation/patreon';


describe('Patreon Campaign Member Poll / Scan Activation', () => {
  // Intentionally squashing all types of test into 1
  // because all types of matches/mismatches happen within a single list
  it('is correct', () => {
    const {
      toUpdateExpiry,
      toSendActivation,
      toDeactivate,
    } = scanPatreonActivationInDatabase({
      members: testPatreonMemberData,
      activations: testActivations,
    });

    expect(toUpdateExpiry).toHaveLength(0);
    expect(toSendActivation).toHaveLength(0);
    expect(toDeactivate[0].key).toBe('danglingPatreon');
    expect(toDeactivate[1].key).toBe('patreonDeclined');
    expect(toDeactivate[2].key).toBe('patreonExpired');
    expect(toDeactivate).toHaveLength(3);
  });
});
