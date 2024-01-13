import {describe, expect, it} from '@jest/globals';

import {getTeamMakerDataSorter} from '@/ui/team/maker/calc/getSorter';
import {TeamMakerBasisValue} from '@/ui/team/maker/type/common';


describe('Team Maker Calculation / Sorter', () => {
  const mealCoverageSorter = getTeamMakerDataSorter<TeamMakerBasisValue>({
    basis: 'mealCoverage',
    getBasisValue: (data) => data,
  });

  it('sorts correctly for meal coverage sorter without any key', () => {
    expect(mealCoverageSorter(
      {strength: 1, mealCoverage: {byIngredient: {}, total: 0}, ingredientProduction: {}},
      {strength: 1, mealCoverage: {byIngredient: {}, total: 0}, ingredientProduction: {}},
    )).toBeCloseTo(0);
    expect(mealCoverageSorter(
      {strength: 1, mealCoverage: {byIngredient: {}, total: 0}, ingredientProduction: {}},
      {strength: 2, mealCoverage: {byIngredient: {}, total: 0}, ingredientProduction: {}},
    )).toBeCloseTo(1);
    expect(mealCoverageSorter(
      {strength: 2, mealCoverage: {byIngredient: {}, total: 0}, ingredientProduction: {}},
      {strength: 1, mealCoverage: {byIngredient: {}, total: 0}, ingredientProduction: {}},
    )).toBeCloseTo(-1);
  });

  it('sorts correctly for meal coverage sorter with single key', () => {
    expect(mealCoverageSorter(
      {strength: 1, mealCoverage: {byIngredient: {5: 0.5}, total: 0.5}, ingredientProduction: {}},
      {strength: 1, mealCoverage: {byIngredient: {5: 0.25}, total: 0.25}, ingredientProduction: {}},
    )).toBeCloseTo(-0.25);
    expect(mealCoverageSorter(
      {strength: 1, mealCoverage: {byIngredient: {5: 0.25}, total: 0.25}, ingredientProduction: {}},
      {strength: 1, mealCoverage: {byIngredient: {5: 0.5}, total: 0.5}, ingredientProduction: {}},
    )).toBeCloseTo(0.25);
  });

  it('sorts correctly for meal coverage sorter with multiple key', () => {
    expect(mealCoverageSorter(
      {strength: 1, mealCoverage: {byIngredient: {4: 0.5, 5: 0.5}, total: 1}, ingredientProduction: {}},
      {strength: 1, mealCoverage: {byIngredient: {4: 0.25, 5: 0.3}, total: 0.55}, ingredientProduction: {}},
    )).toBeCloseTo(-0.45);
    expect(mealCoverageSorter(
      {strength: 1, mealCoverage: {byIngredient: {4: 0.5, 5: 0.3}, total: 0.8}, ingredientProduction: {}},
      {strength: 1, mealCoverage: {byIngredient: {4: 0.25, 5: 0.5}, total: 0.75}, ingredientProduction: {}},
    )).toBeCloseTo(-0.05);
    expect(mealCoverageSorter(
      {strength: 1, mealCoverage: {byIngredient: {4: 0.25, 5: 0.3}, total: 0.55}, ingredientProduction: {}},
      {strength: 1, mealCoverage: {byIngredient: {4: 0.5, 5: 0.5}, total: 1}, ingredientProduction: {}},
    )).toBeCloseTo(0.45);
  });

  it('sorts correctly given array of data', () => {
    const original: TeamMakerBasisValue[] = [
      {strength: 1, mealCoverage: {byIngredient: {4: 0, 5: 0, 6: 0}, total: 0}, ingredientProduction: {}},
      {strength: 1, mealCoverage: {byIngredient: {4: 0, 5: 1, 6: 0}, total: 1}, ingredientProduction: {}},
      {strength: 1, mealCoverage: {byIngredient: {4: 0, 5: 0.5, 6: 1}, total: 1.5}, ingredientProduction: {}},
      {strength: 1, mealCoverage: {byIngredient: {4: 0.25, 5: 0, 6: 0}, total: 0.25}, ingredientProduction: {}},
      {strength: 1, mealCoverage: {byIngredient: {4: 0, 5: 0, 6: 1}, total: 1}, ingredientProduction: {}},
    ];
    const sorted = original.sort(mealCoverageSorter);

    expect(sorted).toHaveLength(5);
    expect(sorted[0]).toMatchObject({strength: 1, mealCoverage: {byIngredient: {4: 0, 5: 0.5, 6: 1}, total: 1.5}});
    expect(sorted[1]).toMatchObject({strength: 1, mealCoverage: {byIngredient: {4: 0, 5: 1, 6: 0}, total: 1}});
    expect(sorted[2]).toMatchObject({strength: 1, mealCoverage: {byIngredient: {4: 0, 5: 0, 6: 1}, total: 1}});
    expect(sorted[3]).toMatchObject({strength: 1, mealCoverage: {byIngredient: {4: 0.25, 5: 0, 6: 0}, total: 0.25}});
    expect(sorted[4]).toMatchObject({strength: 1, mealCoverage: {byIngredient: {4: 0, 5: 0, 6: 0}, total: 0}});
  });
});
