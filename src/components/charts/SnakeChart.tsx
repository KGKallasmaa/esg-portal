import { Chart } from 'react-google-charts'

const SnakeChart = ({ data }) => {
  const options = {}
  return <Chart chartType="Sankey" width="100%" data={data} options={options} />
}
export default SnakeChart
