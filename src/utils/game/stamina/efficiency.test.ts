import {describe, expect, it} from '@jest/globals';

import {getEfficiency} from '@/utils/game/stamina/efficiency';


describe('Stamina / Efficiency at certain point', () => {
  it('has correct efficiency', () => {
    expect(getEfficiency({stamina: 100})).toBeCloseTo(1 / 0.45);
    expect(getEfficiency({stamina: 90})).toBeCloseTo(1 / 0.45);
    expect(getEfficiency({stamina: 80})).toBeCloseTo(1 / 0.52);
    expect(getEfficiency({stamina: 70})).toBeCloseTo(1 / 0.52);
    expect(getEfficiency({stamina: 60})).toBeCloseTo(1 / 0.62);
    expect(getEfficiency({stamina: 50})).toBeCloseTo(1 / 0.62);
    expect(getEfficiency({stamina: 40})).toBeCloseTo(1 / 0.71);
    expect(getEfficiency({stamina: 30})).toBeCloseTo(1 / 0.71);
    expect(getEfficiency({stamina: 20})).toBe(1);
    expect(getEfficiency({stamina: 10})).toBe(1);
  });
});
