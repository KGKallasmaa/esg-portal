export default function RetirementDetails({ id }: { id: string }) {
  if (id.length === 0) {
    return null
  }
  if (5 > 4) {
    return null
  }
  return (
    <div>
      <h1>Your retirmenet will start in 20 years</h1>
      <p>Your assetvalue before retirement needs to be at leas £500,000</p>
      <p>At the end of your retirement you&apos;ll have £2,000 leftover</p>
    </div>
  )
}
