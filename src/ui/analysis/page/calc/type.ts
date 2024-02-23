import {BerryId} from '@/types/game/berry';
import {IngredientId} from '@/types/game/ingredient';
import {
  PokemonId,
  PokemonSkillId,
  PokemonSleepTypeId,
  PokemonSpecialtyId,
  PokemonTypeId,
} from '@/types/game/pokemon';
import {IngredientLevel, IngredientProduction} from '@/types/game/pokemon/ingredient';
import {PokemonIndividualParams} from '@/types/game/pokemon/params';
import {SnorlaxRank} from '@/types/game/rank';
import {SleepMapId} from '@/types/game/sleepStyle';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {CalculatedConfigBundle} from '@/types/userData/config/bundle';
import {AnalysisPageCommonProps} from '@/ui/analysis/page/type';


export type AnalysisStatsLinkedData<TData> = {
  pokemonId: PokemonId,
  data: TData,
};

export type AnalysisStatsCommon<TData> = {
  linked: AnalysisStatsLinkedData<TData>[],
  totalCount: number,
};

export type AnalysisStatsGrouped<TData> = AnalysisStatsCommon<TData> & {
  sharedCount: number,
};

export type AnalysisStatsContinuous<TData> = AnalysisStatsCommon<TData> & {
  percentile: number | null,
  percentage: number | null,
  rank: number | null,
  current: number,
};

export type AnalysisStatsProduction<TItemId, TData> = {
  itemId: TItemId,
  count: AnalysisStatsContinuous<TData>,
  strength: AnalysisStatsContinuous<TData>,
};

export type AnalysisStatsSleepStyleAppearance = AnalysisStatsContinuous<SnorlaxRank> & {
  snorlaxRank: SnorlaxRank,
};

export type AnalysisStatsSleepStyle = {
  mapId: SleepMapId,
  first: AnalysisStatsSleepStyleAppearance,
  last: AnalysisStatsSleepStyleAppearance,
};

export type AnalysisIngredientStatsLinkedData = {
  productions: IngredientProduction[],
  value: number,
};

export type AnalysisStats = {
  pokemon: {
    type: AnalysisStatsGrouped<PokemonTypeId>,
    specialty: AnalysisStatsGrouped<PokemonSpecialtyId>,
    sleepType: AnalysisStatsGrouped<PokemonSleepTypeId>,
    ingredient: {[level in IngredientLevel]: AnalysisStatsGrouped<IngredientProduction>[]},
    berry: AnalysisStatsGrouped<BerryId>,
    mainSkill: AnalysisStatsGrouped<PokemonSkillId>,
    sleepStyle: AnalysisStatsSleepStyle[],
  },
  production: {
    berry: AnalysisStatsProduction<BerryId, number>,
    ingredient: {
      individual: AnalysisStatsProduction<IngredientId, AnalysisIngredientStatsLinkedData>[],
      overall: AnalysisStatsContinuous<number>,
    },
    skillTriggerCount: AnalysisStatsContinuous<number>,
    total: AnalysisStatsContinuous<number>,
  },
};

export type GetAnalysisStatsCommonOpts<TSample> = {
  samples: TSample[],
  getPokemonId: (sample: TSample) => PokemonId,
};

export type GetAnalysisStatsOpts = Omit<AnalysisPageCommonProps, 'mapMeta' | 'preloaded'> & PokemonIndividualParams & {
  ingredients: IngredientProduction[],
  snorlaxFavorite: SnorlaxFavorite,
  calculatedConfigBundle: CalculatedConfigBundle,
};
