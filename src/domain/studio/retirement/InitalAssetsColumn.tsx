import { useGetRetirementPlanById } from '../hooks/studio_hooks'
import NewInitalAssetsButtonGroup from './NewInitalAssetsButtonGroup'
import { InitalAssetCard } from './OneTimeCard'

export default function InitalAssetsColumn({ id }: { id: string }) {
  const { data: myRetirementPlan, refetch } = useGetRetirementPlanById(id)

  return (
    <div>
      <h2>Inital assets</h2>
      <ul role="list" className="divide-y divide-gray-800">
        {myRetirementPlan?.initialAssets?.map((initalAsset) => (
          <InitalAssetCard
            key={'inital-asset-' + initalAsset.id}
            onDelete={() => refetch}
            planId={id}
            id={initalAsset.id}
            title={initalAsset.title}
            description={initalAsset.description}
            category={initalAsset.category}
            amount={initalAsset.value}
            date={initalAsset.date}
          />
        ))}
      </ul>
      <NewInitalAssetsButtonGroup onSuccess={() => refetch} planId={id} />
    </div>
  )
}
