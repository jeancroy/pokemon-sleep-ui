import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {CollapsibleFull} from '@/components/layout/collapsible/full';
import {useCollapsibleControl} from '@/components/layout/collapsible/hook';
import {FlexButton} from '@/components/layout/flex/button';
import {Flex} from '@/components/layout/flex/common';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {PokemonInfo} from '@/types/game/pokemon';
import {pokedexTierBorderStyling} from '@/ui/pokedex/tier/result/const';
import {PokedexTierListButton} from '@/ui/pokedex/tier/result/single/button/main';
import {PokedexTierListEntryDetails} from '@/ui/pokedex/tier/result/single/details/entry';
import {PokedexTierListSingleCommonProps} from '@/ui/pokedex/tier/result/single/type';


type Props = PokedexTierListSingleCommonProps & {
  onPokemonClicked: (pokemon: PokemonInfo) => void,
};

export const PokedexTierListSingle = ({onPokemonClicked, ...props}: Props) => {
  const {
    input,
    tier,
    bucket,
  } = props;
  const isDefaultShow = tier === 'S';

  const collapsible = useCollapsibleControl();

  // Have to delay the auto open after load because the original bucket length will be 0
  // until the calculation is completed
  React.useEffect(() => {
    if (!isDefaultShow) {
      return;
    }

    setTimeout(() => collapsible.setShow(true), 1000);
  }, []);

  React.useEffect(() => {
    if (bucket.length) {
      return;
    }

    // Close the collapsible if the current tier is empty
    collapsible.setShow(false);
  }, [bucket.length]);

  return (
    <CollapsibleFull
      control={collapsible}
      button={<PokedexTierListButton collapsible={collapsible} {...props}/>}
      noButtonPadding
      disabled={!bucket.length}
      classBorder={pokedexTierBorderStyling[tier]}
    >
      <Flex className="gap-1">
        <AdsUnit hideIfNotBlocked/>
        <Flex direction="row" center wrap className="gap-1 p-2" noFullWidth>
          {bucket.map((entry) => {
            const {source} = entry;
            const {pokemon, ingredients} = source;

            const ingredientIds = source.ingredients.map(({id}) => id);
            const pokemonId = source.pokemon.id;
            const key = `${pokemonId}-${ingredientIds.join('-')}`;

            return (
              <AnimatedCollapse key={key} show appear noFullWidth>
                <FlexButton
                  direction="col"
                  className="button-clickable-bg w-28 items-center gap-1 p-2"
                  onClick={() => onPokemonClicked(pokemon)}
                >
                  <Flex direction="row" center className="gap-1.5">
                    <div className="relative size-14">
                      <PokemonImage
                        pokemonId={pokemon.id}
                        image={{type: 'default', image: 'icon'}}
                        isShiny={false}
                        className="rounded-lg"
                      />
                    </div>
                    <PokemonIngredientIcons
                      ingredients={[ingredients]}
                      direction="col"
                      className="gap-0 text-sm"
                      classNameItem="gap-0.5"
                      noLink
                    />
                  </Flex>
                  <PokedexTierListEntryDetails input={input} entry={entry}/>
                </FlexButton>
              </AnimatedCollapse>
            );
          })}
        </Flex>
      </Flex>
    </CollapsibleFull>
  );
};
