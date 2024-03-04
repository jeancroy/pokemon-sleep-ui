import {Collection} from 'mongodb';

import {getDataAsArray, getSingleData} from '@/controller/common';
import mongoPromise from '@/lib/mongodb';
import {ProductionComparisonPresetData} from '@/types/mongo/productionComparison';
import {ProductionComparisonPreset, ProductionComparisonTarget} from '@/types/website/feature/productionComparison';
import {migrate} from '@/utils/migrate/main';
import {productionComparisonPresetMigrators} from '@/utils/migrate/productionComparison/preset/migrators';


const getCollection = async (): Promise<Collection<ProductionComparisonPresetData>> => {
  const client = await mongoPromise;

  return client
    .db('user')
    .collection<ProductionComparisonPresetData>('productionComparison/preset');
};

export const getProductionComparisonTargetById = async (
  targetUuid: string,
): Promise<ProductionComparisonTarget | null> => {
  const preset = await getSingleData(
    getCollection(),
    {[`members.${targetUuid}`]: {$exists: true}},
  );

  if (!preset || preset.version !== productionComparisonPresetMigrators.length) {
    return null;
  }

  // Migrate to ensure the data structure is the latest
  const migratedPreset = migrate({
    original: preset,
    override: null,
    migrators: productionComparisonPresetMigrators,
    migrateParams: {},
  });

  return migratedPreset.members[targetUuid];
};

export const getProductionComparisonPresetsOfUser = (userId: string): Promise<ProductionComparisonPreset[]> => (
  getDataAsArray(getCollection(), {userId})
);

type UpdateProductionComparisonPresets = {
  userId: string,
  presets: ProductionComparisonPreset[],
};

export const updateProductionComparisonPresets = async ({userId, presets}: UpdateProductionComparisonPresets) => {
  const collection = await getCollection();

  await collection.deleteMany({userId});
  await collection.insertMany(presets.map((comp) => ({userId, ...comp})));
};

const addIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({userId: 1}),
    collection.createIndex({userId: 1, uuid: 1}, {unique: true}),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize production comparison preset index', e));
