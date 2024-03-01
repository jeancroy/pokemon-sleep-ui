import {TeamSetupControl} from '@/components/shared/team/setupControl/type';
import {
  ProductionComparisonConfig,
  ProductionComparisonPreset,
  ProductionComparisonSetup,
  ProductionComparisonTarget,
  ProductionComparisonTargetUuid,
} from '@/types/website/feature/productionComparison';


export type ProductionComparisonSetupControl = TeamSetupControl<
  ProductionComparisonTargetUuid,
  ProductionComparisonTarget,
  ProductionComparisonConfig,
  ProductionComparisonPreset,
  ProductionComparisonSetup
>;
