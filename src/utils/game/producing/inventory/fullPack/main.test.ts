import {describe, expect, it} from '@jest/globals';

import {getFullPackStats} from '@/utils/game/producing/inventory/fullPack/main';


describe('Pokemon Production (Full Pack Stats) / Main', () => {
  it('is correct with single sleep session', () => {
    const {bySleep} = getFullPackStats({
      carryLimit: 20,
      intervalsDuringSleep: {
        primary: [{efficiency: 1.5, duration: 30000}],
        secondary: null,
      },
      isFullPack: false,
      qtyPerHelp: 1,
      frequency: 1500,
    });
    const {primary, secondary} = bySleep;

    expect(primary?.duration.vacant).toBeCloseTo(20000);
    expect(secondary).toBeNull();
    expect((primary?.duration.vacant ?? NaN) + (primary?.duration.filled ?? NaN)).toBe(30000);
  });

  it('is correct with dual sleep sessions', () => {
    const {bySleep} = getFullPackStats({
      carryLimit: 20,
      intervalsDuringSleep: {
        primary: [{efficiency: 1.5, duration: 30000}],
        secondary: [{efficiency: 1.2, duration: 30000}],
      },
      isFullPack: false,
      qtyPerHelp: 1,
      frequency: 1500,
    });
    const {primary, secondary} = bySleep;

    expect(primary?.duration.vacant).toBeCloseTo(20000);
    expect(secondary?.duration.vacant).toBeCloseTo(25000);
    expect((primary?.duration.vacant ?? NaN) + (primary?.duration.filled ?? NaN)).toBe(30000);
    expect((secondary?.duration.vacant ?? NaN) + (secondary?.duration.filled ?? NaN)).toBe(30000);
  });

  it('is correct if the inventory will not be full during sleep', () => {
    const {bySleep} = getFullPackStats({
      carryLimit: 100,
      intervalsDuringSleep: {
        primary: [{efficiency: 1.5, duration: 30000}],
        secondary: null,
      },
      isFullPack: false,
      qtyPerHelp: 1,
      frequency: 1500,
    });
    const {primary, secondary} = bySleep;

    expect(primary?.duration.vacant).toBe(30000);
    expect(secondary).toBeNull();
    expect((primary?.duration.vacant ?? NaN) + (primary?.duration.filled ?? NaN)).toBe(30000);
  });

  it('respects `isFullPack` with primary sleep efficiency intervals only', () => {
    const {bySleep} = getFullPackStats({
      carryLimit: 30,
      intervalsDuringSleep: {
        primary: [{efficiency: 1.5, duration: 30000}],
        secondary: null,
      },
      isFullPack: true,
      qtyPerHelp: 1,
      frequency: 1500,
    });
    const {primary, secondary} = bySleep;

    expect(primary?.duration.vacant).toBe(0);
    expect(secondary).toBeNull();
    expect((primary?.duration.vacant ?? NaN) + (primary?.duration.filled ?? NaN)).toBe(30000);
  });

  it('respects `isFullPack` with secondary sleep efficiency intervals', () => {
    const {bySleep} = getFullPackStats({
      carryLimit: 30,
      intervalsDuringSleep: {
        primary: [{efficiency: 1.5, duration: 30000}],
        secondary: [{efficiency: 1.2, duration: 30000}],
      },
      isFullPack: true,
      qtyPerHelp: 1,
      frequency: 1500,
    });
    const {primary, secondary} = bySleep;

    expect(primary?.duration.vacant).toBeCloseTo(0);
    expect(secondary?.duration.vacant).toBeCloseTo(0);
    expect((primary?.duration.vacant ?? NaN) + (primary?.duration.filled ?? NaN)).toBe(30000);
    expect((secondary?.duration.vacant ?? NaN) + (secondary?.duration.filled ?? NaN)).toBe(30000);
  });

  it('has correct sum of durations using realistic data', () => {
    const {bySleep} = getFullPackStats({
      carryLimit: 24,
      intervalsDuringSleep: {
        primary: [
          {efficiency: 1 / 0.52, duration: 600},
          {efficiency: 1 / 0.62, duration: 12000},
          {efficiency: 1 / 0.71, duration: 12000},
          {efficiency: 1, duration: 4200},
        ],
        secondary: null,
      },
      isFullPack: false,
      qtyPerHelp: 1.07116106,
      frequency: 1582,
    });
    const {primary} = bySleep;

    expect((primary?.duration.vacant ?? NaN) + (primary?.duration.filled ?? NaN)).toBe(28800);
  });
});
