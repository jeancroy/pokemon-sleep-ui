'use client';
import React from 'react';

import {useSession} from 'next-auth/react';
import {useTranslations} from 'next-intl';

import {getSingleSelectOnClickProps} from '@/components/input/filter/utils/props';
import {CollapsibleFull} from '@/components/layout/collapsible/full';
import {useCollapsibleControl} from '@/components/layout/collapsible/hook';
import {Flex} from '@/components/layout/flex/common';
import {PokemonKeyLevelInput} from '@/components/shared/pokemon/level/input';
import {PokemonLab} from '@/components/shared/pokemon/predefined/lab/main';
import {RatingBasisSelection} from '@/components/shared/pokemon/rating/basis/selection/main';
import {RatingFriendshipLevel} from '@/components/shared/pokemon/rating/friendship/main';
import {RatingResult} from '@/components/shared/pokemon/rating/main';
import {SnorlaxFavoriteInput} from '@/components/shared/snorlax/favorite';
import {defaultMaxRatingLevel} from '@/const/game/rating/common';
import {defaultSnorlaxFavorite} from '@/const/game/snorlax';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {useConfigBundle} from '@/hooks/userData/config/bundle/main';
import {RatingOnDeskState, RatingRequest} from '@/types/game/pokemon/rating/request';
import {RatingDataProps, RatingServerDataProps} from '@/ui/rating/type';
import {toRatingRequest} from '@/ui/rating/utils';
import {getPokemonMaxEvolutionCount} from '@/utils/game/pokemon/evolution/count';
import {toPokemonList} from '@/utils/game/pokemon/utils';
import {getPokemonProducingParams} from '@/utils/game/producing/params';
import {getDefaultRatingBasis} from '@/utils/game/rating/utils';


export const RatingClient = (props: RatingServerDataProps) => {
  const serverData = useCommonServerData();
  const {
    pokedexMap,
    pokemonProducingParamsMap,
    fieldMetaMap,
    serverConfigBundle,
  } = serverData;

  const t = useTranslations('UI.InPage.Rating');
  const [request, setRequest] = React.useState<RatingRequest>();
  const {data: session} = useSession();
  const bundle = useConfigBundle({
    bundle: {
      server: serverConfigBundle,
      client: session?.user.preloaded,
    },
  });
  const advancedOptionsCollapsible = useCollapsibleControl();

  const resultRef = React.useRef<HTMLDivElement>(null);

  const pokemonList = toPokemonList(pokedexMap);
  const data: RatingDataProps = {
    pokemonList,
    maxEvolutionCount: getPokemonMaxEvolutionCount(pokemonList),
    ...props,
    ...serverData,
  };

  const scrollToResult = () => resultRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'});

  return (
    <PokemonLab
      {...data}
      onPokemonPicked={(setup, opts) => {
        const {origin} = opts;

        if (origin === 'pokebox') {
          setRequest(toRatingRequest({setup: {...setup, bundle}}));
          scrollToResult();
        } else if (origin === 'pokedex' && request) {
          // This is for resetting the result layout
          setRequest(toRatingRequest({
            setup: {...setup, bundle},
            timestamp: request.timestamp,
          }));
        }
      }}
      onRun={(setup: RatingOnDeskState) => {
        scrollToResult();
        setRequest(toRatingRequest({setup: {...setup, bundle}}));
      }}
      toState={(onDeskState): RatingOnDeskState => ({
        ...onDeskState,
        snorlaxFavorite: defaultSnorlaxFavorite,
        basis: getDefaultRatingBasis(onDeskState.pokemon.specialty),
        friendshipLevel: 0,
        maxRatingLevel: defaultMaxRatingLevel,
      })}
      renderAdditional={(onDesk, setOnDesk) => (
        <Flex className="gap-1.5">
          <RatingBasisSelection
            current={onDesk.basis}
            onSelect={(basis) => setOnDesk((original) => ({
              ...original,
              basis,
            }))}
          />
          <PokemonKeyLevelInput
            disallowNull
            {...getSingleSelectOnClickProps({
              filter: onDesk,
              setFilter: setOnDesk,
              filterKey: 'maxRatingLevel',
              allowNull: false,
            })}
          />
          <CollapsibleFull control={advancedOptionsCollapsible} button={t('AdvancedOptions')}>
            <Flex className="gap-1.5">
              <SnorlaxFavoriteInput
                pokemonList={pokemonList}
                fieldMetaMap={fieldMetaMap}
                filter={onDesk}
                setFilter={setOnDesk}
                filterKey="snorlaxFavorite"
              />
              <RatingFriendshipLevel
                current={onDesk.friendshipLevel}
                onUpdated={(friendshipLevel) => setOnDesk((original) => ({
                  ...original,
                  friendshipLevel,
                }))}
              />
            </Flex>
          </CollapsibleFull>
        </Flex>
      )}
      renderResult={({pokemon}) => (
        <RatingResult
          ref={resultRef}
          request={request}
          pokemon={pokemon}
          pokemonProducingParams={getPokemonProducingParams({
            pokemonId: pokemon.id,
            pokemonProducingParamsMap,
          })}
          {...data}
          {...serverData}
        />
      )}
    />
  );
};
