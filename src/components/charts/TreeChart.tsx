import { Chart } from 'react-google-charts'

const TreeMap = ({ data }) => {
  const options = {
    minColor: '#f00',
    midColor: '#ddd',
    maxColor: '#0d0',
    headerHeight: 15,
    fontColor: 'black',
    showScale: true,
  }

  return (
    <Chart
      chartType="TreeMap"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  )
}
export default TreeMap
