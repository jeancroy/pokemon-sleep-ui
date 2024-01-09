import {describe, expect, it} from '@jest/globals';

import {isCurrentTeamMakerBasisValueWorse} from '@/ui/team/maker/calc/utils';


describe('Team Maker Calculation / Basis Value Comparison', () => {
  it('is correct comparing meal coverage without any key', () => {
    expect(isCurrentTeamMakerBasisValueWorse({
      basis: 'mealCoverage',
      current: {strength: 1, mealCoverage: {byIngredient: {}, total: 0}},
      baseline: {strength: 1, mealCoverage: {byIngredient: {}, total: 0}},
    })).toBeFalsy();
    expect(isCurrentTeamMakerBasisValueWorse({
      basis: 'mealCoverage',
      current: {strength: 1, mealCoverage: {byIngredient: {}, total: 0}},
      baseline: {strength: 2, mealCoverage: {byIngredient: {}, total: 0}},
    })).toBeTruthy();
    expect(isCurrentTeamMakerBasisValueWorse({
      basis: 'mealCoverage',
      current: {strength: 2, mealCoverage: {byIngredient: {}, total: 0}},
      baseline: {strength: 1, mealCoverage: {byIngredient: {}, total: 0}},
    })).toBeFalsy();
  });

  it('is correct comparing meal coverage with single key', () => {
    expect(isCurrentTeamMakerBasisValueWorse({
      basis: 'mealCoverage',
      current: {strength: 1, mealCoverage: {byIngredient: {5: 0.5}, total: 0.5}},
      baseline: {strength: 1, mealCoverage: {byIngredient: {5: 0.25}, total: 0.25}},
    })).toBeFalsy();
    expect(isCurrentTeamMakerBasisValueWorse({
      basis: 'mealCoverage',
      current: {strength: 1, mealCoverage: {byIngredient: {5: 0.25}, total: 0.25}},
      baseline: {strength: 1, mealCoverage: {byIngredient: {5: 0.5}, total: 0.5}},
    })).toBeTruthy();
  });

  it('is correct comparing meal coverage with multiple keys', () => {
    expect(isCurrentTeamMakerBasisValueWorse({
      basis: 'mealCoverage',
      current: {strength: 1, mealCoverage: {byIngredient: {4: 0.5, 5: 0.5}, total: 1}},
      baseline: {strength: 1, mealCoverage: {byIngredient: {4: 0.25, 5: 0.3}, total: 0.55}},
    })).toBeFalsy();
    expect(isCurrentTeamMakerBasisValueWorse({
      basis: 'mealCoverage',
      current: {strength: 1, mealCoverage: {byIngredient: {4: 0.5, 5: 0.3}, total: 0.8}},
      baseline: {strength: 1, mealCoverage: {byIngredient: {4: 0.25, 5: 0.5}, total: 0.75}},
    })).toBeFalsy();
    expect(isCurrentTeamMakerBasisValueWorse({
      basis: 'mealCoverage',
      current: {strength: 1, mealCoverage: {byIngredient: {4: 0.25, 5: 0.3}, total: 0.55}},
      baseline: {strength: 1, mealCoverage: {byIngredient: {4: 0.5, 5: 0.5}, total: 1}},
    })).toBeTruthy();
  });

  it('is correct comparing meal coverage when the requirements are satisfied even if current is worse', () => {
    // Check #670
    expect(isCurrentTeamMakerBasisValueWorse({
      basis: 'mealCoverage',
      current: {strength: 1, mealCoverage: {byIngredient: {4: 0.5, 5: 1.2}, total: 1.1}},
      baseline: {strength: 1, mealCoverage: {byIngredient: {4: 0.97, 5: 2.27}, total: 1.9}},
    })).toBeFalsy();
  });
});
