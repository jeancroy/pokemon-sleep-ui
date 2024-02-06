import {Pool as initWorkerPool, spawn, Worker} from 'threads';


import {getRateOfPokemon} from '@/ui/team/pokebox/content/pokeInBox/worker/production/main';


export const pokeboxProductionPool = initWorkerPool(
  // @ts-expect-error: Can't use `new URL().href` here or the worker loading will fail
  () => spawn<typeof getRateOfPokemon>(new Worker(new URL('./worker', import.meta.url))),
  // Fixing concurrency count to avoid OOM
  8,
);
