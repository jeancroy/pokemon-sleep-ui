import React from 'react';

import pick from 'lodash/pick';
import {v4} from 'uuid';

import {TeamMemberView} from '@/components/shared/team/memberView/main';
import {sortTeamMemberProduction} from '@/components/shared/team/productionSort/calc/main';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {UseUserDataActorReturn} from '@/hooks/userData/actor/type';
import {PokemonInfo} from '@/types/game/pokemon';
import {CalculatedConfigBundle} from '@/types/userData/config/bundle';
import {
  ProductionComparisonConfig,
  ProductionComparisonPreset,
  ProductionComparisonPresetProduction,
  ProductionComparisonSetup,
  ProductionComparisonTarget,
  ProductionComparisonTargetUuid,
} from '@/types/website/feature/productionComparison';
import {getProductionComparisonPresetStats} from '@/ui/production/calc/main';
import {ProductionComparisonSetupControl} from '@/ui/production/client/type';
import {ProductionComparisonDataProps} from '@/ui/production/type';
import {toTeamMemberDataFromVanilla, toTeamMemberFromPokeInBox} from '@/utils/team/toMember';


type Props = ProductionComparisonDataProps & {
  maxEvolutionCount: number,
  calculatedConfigBundle: CalculatedConfigBundle,
  presetStats: ProductionComparisonPresetProduction,
  actorReturn: UseUserDataActorReturn,
  setupControl: ProductionComparisonSetupControl,
  showPokemon: (pokemon: PokemonInfo) => void,
};

export const ProductionComparisonTargets = ({
  preloaded,
  calculatedConfigBundle,
  presetStats,
  actorReturn,
  setupControl,
  showPokemon,
  ...props
}: Props) => {
  const {currentTeam} = setupControl;
  const {actAsync} = actorReturn;
  const {bundle, calculatedCookingConfig} = calculatedConfigBundle;

  const serverData = useCommonServerData();
  const {ingredientChainMap} = serverData;

  return (
    <TeamMemberView<
        ProductionComparisonTargetUuid,
        ProductionComparisonTarget,
        ProductionComparisonConfig,
        ProductionComparisonPreset,
        ProductionComparisonSetup
      >
      actorReturn={actorReturn}
      showPokemon={showPokemon}
      bundle={bundle}
      calculatedCookingConfig={calculatedCookingConfig}
      setupControl={setupControl}
      getRateByLevel={(level, uuid) => getProductionComparisonPresetStats({
        overrideLevel: level,
        bundle,
        calculatedCookingConfig,
        // Override `currentPreset.members` to contain the target to evaluate only to save some performance
        currentPreset: {
          ...currentTeam,
          members: pick(currentTeam.members, [uuid]),
        },
        ...serverData,
      })[uuid]}
      memberKeys={Object.keys(currentTeam.members)}
      getMemberProduction={(uuid) => presetStats[uuid]}
      getMemberFromVanilla={(pokemon, memberKey) => ({
        ...toTeamMemberDataFromVanilla({
          pokemon,
          chain: ingredientChainMap[pokemon.ingredientChain],
        }),
        uuid: memberKey,
      })}
      getMemberFromPokeInBox={(pokeInBox, memberKey) => ({
        ...toTeamMemberFromPokeInBox(pokeInBox),
        uuid: memberKey,
      })}
      getTeamMemberFromCloud={async (targetUuid, uuid) => {
        if (!actAsync) {
          return null;
        }

        const {updated} = await actAsync({
          action: 'load',
          options: {
            type: 'productionComparisonTarget',
            opts: {targetUuid},
          },
          getStatusOnCompleted: (updated) => (
            !!updated?.user.lazyLoaded.productionComparisonTarget ? 'completed' : 'failed'
          ),
        });

        const target = updated?.user.lazyLoaded.productionComparisonTarget;
        if (!target) {
          return null;
        }

        return {...target, uuid};
      }}
      getMemberIdForShare={(_, memberKey) => memberKey}
      generateKeyForEmptySlot={v4}
      productionSorter={currentTeam.sort === null ? undefined : sortTeamMemberProduction(currentTeam.sort)}
      {...props}
    />
  );
};
