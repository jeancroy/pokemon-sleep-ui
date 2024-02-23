import {describe, expect, it} from '@jest/globals';


import {toProductionOfPeriod} from '@/utils/game/producing/convert';


describe('Pokemon Production (Convert) / By Period', () => {
  it('is correct when rate period = desired period', () => {
    const {period, qty, strength} = toProductionOfPeriod({
      period: 'daily',
      rate: {
        period: 'daily',
        qty: 1,
        strength: 100,
      },
    });

    expect(period).toBe('daily');
    expect(qty).toBe(1);
    expect(strength).toBe(100);
  });

  it('is correct when rate period is daily and desired period is weekly', () => {
    const {period, qty, strength} = toProductionOfPeriod({
      period: 'weekly',
      rate: {
        period: 'daily',
        qty: 1,
        strength: 100,
      },
    });

    expect(period).toBe('weekly');
    expect(qty).toBe(7);
    expect(strength).toBe(700);
  });

  it('is correct when rate period is weekly and desired period is daily', () => {
    const {period, qty, strength} = toProductionOfPeriod({
      period: 'daily',
      rate: {
        period: 'weekly',
        qty: 7,
        strength: 700,
      },
    });

    expect(period).toBe('daily');
    expect(qty).toBe(1);
    expect(strength).toBe(100);
  });
});
