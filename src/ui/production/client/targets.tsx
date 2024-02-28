import React from 'react';

import pick from 'lodash/pick';
import {v4} from 'uuid';

import {TeamMemberView} from '@/components/shared/team/memberView/main';
import {UseUserDataActorReturn} from '@/hooks/userData/actor/type';
import {PokemonInfo} from '@/types/game/pokemon';
import {
  ProductionComparisonConfig,
  ProductionComparisonPreset,
  ProductionComparisonPresetProduction,
  ProductionComparisonSetup,
  ProductionComparisonTarget,
  ProductionComparisonTargetUuid,
} from '@/types/productionComparison';
import {CalculatedConfigBundle} from '@/types/userData/config/bundle';
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
  currentPreset: ProductionComparisonPreset,
  showPokemon: (pokemon: PokemonInfo) => void,
};

export const ProductionComparisonTargets = ({
  preloaded,
  calculatedConfigBundle,
  presetStats,
  actorReturn,
  setupControl,
  currentPreset,
  showPokemon,
  ...props
}: Props) => {
  const {ingredientChainMap} = props;
  const {actAsync} = actorReturn;
  const {bundle, calculatedCookingConfig} = calculatedConfigBundle;

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
      currentTeam={currentPreset}
      setupControl={setupControl}
      getRateByLevel={(level, uuid) => getProductionComparisonPresetStats({
        overrideLevel: level,
        snorlaxFavorite: currentPreset.snorlaxFavorite,
        bundle,
        calculatedCookingConfig,
        // Override `currentPreset.members` to contain the target to evaluate only to save some performance
        currentPreset: {
          ...currentPreset,
          members: pick(currentPreset.members, [uuid]),
        },
        ...props,
      })[uuid]}
      memberKeys={Object.keys(currentPreset.members)}
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
      getTeamMemberFromCloud={async (targetUuid) => {
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

        return updated?.user.lazyLoaded.productionComparisonTarget ?? null;
      }}
      getMemberIdForShare={({uuid}) => uuid}
      generateKeyForEmptySlot={v4}
      {...props}
    />
  );
};
