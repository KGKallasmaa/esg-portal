import Assets from '../../../models/assets'

export const HoldingQueries = {
  HoldingsBetweenDates: (types: Assets.AssetType[], start: Date, end: Date) => [
    'currentHoldings',
    types,
    start,
    end,
  ],
  HoldingById: (id: string) => ['holdingById', id],
  HoldingsByIds: (ids: string[]) => ['holdingByIds', ids],
  AllHoldings: (types: Assets.AssetType[]) => ['alHoldings', types],
}
