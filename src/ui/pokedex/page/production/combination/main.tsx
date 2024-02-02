import React from 'react';

import {useTranslations} from 'next-intl';

import {useCollapsibleControl} from '@/components/layout/collapsible/hook';
import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {MealCoverageIcon} from '@/components/shared/icon/mealCoverage';
import {MealCoverageComboCollapsible} from '@/components/shared/meal/coverage/combo/collapsible';
import {IngredientIcons} from '@/components/shared/meal/ingredients/icons';
import {IngredientCounter} from '@/types/game/ingredient';
import {IngredientChain} from '@/types/game/pokemon/ingredient';
import {PokemonProductionCombinationItem} from '@/ui/pokedex/page/production/combination/item';
import {PokemonProductionCombinationCommonProps} from '@/ui/pokedex/page/production/combination/type';
import {getPokemonProductionCombinationRateCollection} from '@/ui/pokedex/page/production/combination/utils';
import {pokemonInfoProductionRatePeriod} from '@/ui/pokedex/page/production/const';
import {isNotNullish} from '@/utils/type';


type Props = PokemonProductionCombinationCommonProps & {
  chain: IngredientChain,
};

export const PokemonProductionCombination = ({chain, ...props}: Props) => {
  const {input, mealMap} = props;
  const {level} = input;

  const [rateKey, setRateKey] = React.useState<string | null>(null);
  const collapsible = useCollapsibleControl();
  const t = useTranslations('UI.Common');
  const mealCoverageRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Set `rateKey` to 1st available if the current key is unavailable in `rateCollection` anymore,
    // possibly due to level change going across level breakpoint
    if (rateKey && !rateCollection[rateKey]) {
      const firstKey = Object.keys(rateCollection).at(0);

      setRateKey(firstKey ?? null);
      collapsible.setShow(!!firstKey);
    }
  }, [level, rateKey]);

  const rateCollection = getPokemonProductionCombinationRateCollection({chain, ...props});

  const scrollToMealCoverage = () => mealCoverageRef.current?.scrollIntoView({behavior: 'smooth', block: 'center'});

  return (
    <Flex className="gap-1">
      <Grid className="grid-cols-1 gap-1 xl:grid-cols-2">
        {Object.values(rateCollection).filter(isNotNullish).map((rateCollectionItem) => (
          <PokemonProductionCombinationItem
            key={rateCollectionItem.key}
            rateCollectionItem={rateCollectionItem}
            onClick={() => {
              setRateKey(rateCollectionItem.key);
              collapsible.setShow(true);
              scrollToMealCoverage();
            }}
            {...props}
          />
        ))}
      </Grid>
      <MealCoverageComboCollapsible
        collapsible={collapsible}
        mealMap={mealMap}
        ingredientProduction={Object.fromEntries(
          rateKey ?
            Object.values(rateCollection[rateKey]?.rate.ingredient ?? {})
              .map(({id, quantity}) => [id, quantity.equivalent]) :
            [],
        ) as IngredientCounter}
        period={pokemonInfoProductionRatePeriod}
        disabled={!rateKey}
      >
        <Flex direction="row" center className="gap-1" ref={mealCoverageRef}>
          <MealCoverageIcon alt={t('MealCoverage')}/>
          <span>{t('MealCoverage')}</span>
          {
            rateKey &&
            <IngredientIcons
              ingredients={rateCollection[rateKey]?.ingredients ?? []}
              dimension="size-5"
              useTextShadow={false}
              classOfText="text-base"
            />
          }
        </Flex>
      </MealCoverageComboCollapsible>
    </Flex>
  );
};
