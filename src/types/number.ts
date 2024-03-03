export type NumberFormat = 'int' | 'float1' | 'float' | 'float3' | 'float4';

export type ValueWithId<TId, TValue> = {
  id: TId,
  value: TValue,
};
