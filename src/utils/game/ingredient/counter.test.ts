import {describe, expect, it} from '@jest/globals';

import {addIngredientCount, isIngredientCounterEmpty, subtractIngredientCount} from '@/utils/game/ingredient/counter';


describe('Ingredient Counter / Addition', () => {
  it('is correct with empty object', () => {
    const result = addIngredientCount([{1: 5}, {}]);

    expect(result).toMatchObject({1: 5});
  });

  it('is correct with null values', () => {
    const result = addIngredientCount([{1: 2}, {1: null}]);

    expect(result).toMatchObject({1: 2});
  });

  it('is correct with some 0 values', () => {
    const result = addIngredientCount([{1: 0}, {1: 5}]);

    expect(result).toMatchObject({1: 5});
  });

  it('is correct with all 0 values', () => {
    const result = addIngredientCount([{1: 0}, {1: 0}]);

    expect(result).toMatchObject({1: 0});
  });

  it('is correct with non-0 values', () => {
    const result = addIngredientCount([{1: 3, 2: 1}, {1: 5, 3: 7}]);

    expect(result).toMatchObject({1: 8, 2: 1, 3: 7});
  });
});

describe('Ingredient Counter / Subtraction', () => {
  it('expects positive results', () => {
    const result = subtractIngredientCount(
      {5: 0.5},
      {5: 0.25},
    );

    expect(result).toMatchObject({5: 0.25});
  });

  it('expects negative results being included', () => {
    const result = subtractIngredientCount(
      {5: 0.25},
      {5: 0.5},
      {includeNegativeResult: true},
    );

    expect(result).toMatchObject({5: -0.25});
  });

  it('expects negative results being excluded', () => {
    const result = subtractIngredientCount(
      {5: 0.25},
      {5: 0.5},
    );

    expect(result).toMatchObject({});
  });

  it('expects neutral results', () => {
    const result = subtractIngredientCount(
      {5: 0.5},
      {5: 0.5},
    );

    expect(result).toMatchObject({5: 0});
  });

  it('is correct with additional key in minuend', () => {
    const result = subtractIngredientCount(
      {5: 0.5, 8: 1},
      {5: 0.25},
    );

    expect(result).toMatchObject({5: 0.25, 8: 1});
  });

  it('is correct with additional key in subtrahend', () => {
    const result = subtractIngredientCount(
      {5: 0.5},
      {5: 0.25, 8: 1},
    );

    expect(result).toMatchObject({5: 0.25});
  });

  it('is correct with 0 value in minuend', () => {
    const result = subtractIngredientCount(
      {5: 0.5, 8: 0},
      {5: 0.25, 8: 1},
      {includeNegativeResult: true},
    );

    expect(result).toMatchObject({5: 0.25, 8: -1});
  });
});

describe('Ingredient Counter / Is Empty', () => {
  it('is correct with empty object', () => {
    expect(isIngredientCounterEmpty({})).toBeTruthy();
  });

  it('is correct with null values', () => {
    expect(isIngredientCounterEmpty({1: null})).toBeTruthy();
  });

  it('is correct with 0 values', () => {
    expect(isIngredientCounterEmpty({1: 0})).toBeTruthy();
  });

  it('is correct with non-0 values', () => {
    expect(isIngredientCounterEmpty({1: 1})).toBeFalsy();
  });
});
