import {describe, expect, it} from '@jest/globals';

import {FilterInclusionMap} from '@/components/input/filter/type';
import {enforceFilterWithSkillValue} from '@/components/shared/pokemon/sorter/enforcer/skillValue';
import {PokemonSortType} from '@/components/shared/pokemon/sorter/type';
import {MainSkillId} from '@/types/game/pokemon/mainSkill';


type TestFilter = {
  mainSkill: FilterInclusionMap<MainSkillId>,
  sort: PokemonSortType,
  sort2: PokemonSortType,
};

describe('Enforcer of filter with skill value', () => {
  it('selects exactly 1 main skill when skill value sort is selected with 0 main skill selected', () => {
    const {mainSkill, sort, sort2} = enforceFilterWithSkillValue<TestFilter, PokemonSortType>({
      original: {
        mainSkill: {},
        sort: 'id',
        sort2: 'id',
      } satisfies TestFilter,
      updated: {
        mainSkill: {},
        sort: 'mainSkillValue',
        sort2: 'id',
      } satisfies TestFilter,
      config: {
        mainSkill: {key: 'mainSkill', defaultValue: {1: true}},
        sort: [
          {key: 'sort', defaultValue: 'friendshipPoint'},
          {key: 'sort2', defaultValue: 'timeToFullPackPrimary'},
        ],
      },
    });

    expect(mainSkill).toMatchObject({1: true});
    expect(sort).toBe('mainSkillValue');
    expect(sort2).toBe('id');
  });

  it('selects exactly 1 main skill when skill value sort is selected with 1 main skill selected', () => {
    const {mainSkill, sort, sort2} = enforceFilterWithSkillValue<TestFilter, PokemonSortType>({
      original: {
        mainSkill: {1: true},
        sort: 'id',
        sort2: 'id',
      } satisfies TestFilter,
      updated: {
        mainSkill: {1: true},
        sort: 'mainSkillValue',
        sort2: 'id',
      } satisfies TestFilter,
      config: {
        mainSkill: {key: 'mainSkill', defaultValue: {2: true}},
        sort: [
          {key: 'sort', defaultValue: 'friendshipPoint'},
          {key: 'sort2', defaultValue: 'timeToFullPackPrimary'},
        ],
      },
    });

    expect(mainSkill).toMatchObject({1: true});
    expect(sort).toBe('mainSkillValue');
    expect(sort2).toBe('id');
  });

  it('selects exactly 1 main skill when skill value sort is selected with multiple main skills selected', () => {
    const {mainSkill, sort, sort2} = enforceFilterWithSkillValue<TestFilter, PokemonSortType>({
      original: {
        mainSkill: {1: true, 2: true},
        sort: 'id',
        sort2: 'id',
      } satisfies TestFilter,
      updated: {
        mainSkill: {3: true},
        sort: 'mainSkillValue',
        sort2: 'id',
      } satisfies TestFilter,
      config: {
        mainSkill: {key: 'mainSkill', defaultValue: {4: true}},
        sort: [
          {key: 'sort', defaultValue: 'friendshipPoint'},
          {key: 'sort2', defaultValue: 'timeToFullPackPrimary'},
        ],
      },
    });

    expect(mainSkill).toMatchObject({1: true});
    expect(sort).toBe('mainSkillValue');
    expect(sort2).toBe('id');
  });

  it('sets sort to something else and removes main skill when clicked while skill value sort is active', () => {
    const {mainSkill, sort, sort2} = enforceFilterWithSkillValue<TestFilter, PokemonSortType>({
      original: {
        mainSkill: {1: true},
        sort: 'mainSkillValue',
        sort2: 'id',
      } satisfies TestFilter,
      updated: {
        mainSkill: {},
        sort: 'id',
        sort2: 'timeToFullPackPrimary',
      } satisfies TestFilter,
      config: {
        mainSkill: {key: 'mainSkill', defaultValue: {2: true}},
        sort: [
          {key: 'sort', defaultValue: 'id'},
          {key: 'sort2', defaultValue: 'timeToFullPackPrimary'},
        ],
      },
    });

    expect(mainSkill).toMatchObject({});
    expect(sort).toBe('id');
    expect(sort2).toBe('timeToFullPackPrimary');
  });

  it('changes to new main skill selection while skill value sort is active', () => {
    const {mainSkill, sort, sort2} = enforceFilterWithSkillValue<TestFilter, PokemonSortType>({
      original: {
        mainSkill: {1: true},
        sort: 'mainSkillValue',
        sort2: 'id',
      } satisfies TestFilter,
      updated: {
        mainSkill: {1: true, 2: true},
        sort: 'mainSkillValue',
        sort2: 'id',
      } satisfies TestFilter,
      config: {
        mainSkill: {key: 'mainSkill', defaultValue: {3: true}},
        sort: [
          {key: 'sort', defaultValue: 'id'},
          {key: 'sort2', defaultValue: 'timeToFullPackPrimary'},
        ],
      },
    });

    expect(mainSkill).toMatchObject({2: true});
    expect(sort).toBe('mainSkillValue');
    expect(sort2).toBe('id');
  });

  it('keeps the main skill selection even if the sort changes to non-skill value one', () => {
    const {mainSkill, sort, sort2} = enforceFilterWithSkillValue<TestFilter, PokemonSortType>({
      original: {
        mainSkill: {1: true},
        sort: 'mainSkillValue',
        sort2: 'id',
      } satisfies TestFilter,
      updated: {
        mainSkill: {1: true},
        sort: 'id',
        sort2: 'id',
      } satisfies TestFilter,
      config: {
        mainSkill: {key: 'mainSkill', defaultValue: {2: true}},
        sort: [
          {key: 'sort', defaultValue: 'frequency'},
          {key: 'sort2', defaultValue: 'timeToFullPackPrimary'},
        ],
      },
    });

    expect(mainSkill).toMatchObject({1: true});
    expect(sort).toBe('id');
    expect(sort2).toBe('id');
  });

  it('keeps it as-is if one of the skill value sorts is changed to non-skill value one', () => {
    const {mainSkill, sort, sort2} = enforceFilterWithSkillValue<TestFilter, PokemonSortType>({
      original: {
        mainSkill: {1: true},
        sort: 'mainSkillValue',
        sort2: 'mainSkillValue',
      } satisfies TestFilter,
      updated: {
        mainSkill: {1: true},
        sort: 'mainSkillValue',
        sort2: 'id',
      } satisfies TestFilter,
      config: {
        mainSkill: {key: 'mainSkill', defaultValue: {2: true}},
        sort: [
          {key: 'sort', defaultValue: 'frequency'},
          {key: 'sort2', defaultValue: 'timeToFullPackPrimary'},
        ],
      },
    });

    expect(mainSkill).toMatchObject({1: true});
    expect(sort).toBe('mainSkillValue');
    expect(sort2).toBe('id');
  });

  it('keeps it as-is if one of the non-skill value sorts is changed to skill value', () => {
    const {mainSkill, sort, sort2} = enforceFilterWithSkillValue<TestFilter, PokemonSortType>({
      original: {
        mainSkill: {1: true},
        sort: 'mainSkillValue',
        sort2: 'id',
      } satisfies TestFilter,
      updated: {
        mainSkill: {1: true},
        sort: 'mainSkillValue',
        sort2: 'mainSkillValue',
      } satisfies TestFilter,
      config: {
        mainSkill: {key: 'mainSkill', defaultValue: {2: true}},
        sort: [
          {key: 'sort', defaultValue: 'frequency'},
          {key: 'sort2', defaultValue: 'timeToFullPackPrimary'},
        ],
      },
    });

    expect(mainSkill).toMatchObject({1: true});
    expect(sort).toBe('mainSkillValue');
    expect(sort2).toBe('mainSkillValue');
  });
});
