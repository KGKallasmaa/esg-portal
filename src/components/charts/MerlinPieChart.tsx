import { isMobile } from 'react-device-detect'
import {
  Cell,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

type PieChartData = {
  name: string
  value: number
}

const COLORS = [
  '#FF6384',
  '#36A2EB',
  '#FFCE56',
  '#4BC0C0',
  '#9966FF',
  '#FF9F40',
  '#E7E9ED',
  '#4D5360',
  '#70AD47',
]

// Custom tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: '#ffff',
          padding: '5px',
          border: '1px solid #cccccc',
        }}
      >
        <p className="label">{`${payload[0].name} : ${payload[0].value}`}</p>
      </div>
    )
  }
  return null
}

export function MerlinPieChart({
  label,
  data,
}: {
  label: string
  data: PieChartData[]
}) {
  const total = data.reduce((acc, item) => acc + item.value, 0)
  data = data.map((item) => {
    return {
      ...item,
      percent: item.value / total,
    }
  })

  const renderLabel = (entry: { name: string; percent: number }) => {
    if (isMobile) {
      return `${entry.name}`
    }
    return `${entry.name}: ${(entry.percent * 100).toFixed(0)}%`
  }

  return (
    <>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            innerRadius={100}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            startAngle={90}
            endAngle={-270} // Makes the chart a full circle
          >
            {data.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
            {/* Central Label */}
            <Label
              value={label}
              position="center"
              fill="#ffffff"
              fontSize="20px"
            />
          </Pie>
          <Tooltip cursor={{ fill: 'transparent' }} />
        </PieChart>
      </ResponsiveContainer>
    </>
  )
}
function chartColor(category) {
  let hash = 0
  for (let i = 0; i < category.length; i++) {
    const char = category.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  const color = (hash & 0x00ffffff).toString(16).toUpperCase().padStart(6, '0')

  const colorInt = parseInt(color.substring(1), 16)
  const complement = (0xffffff ^ colorInt).toString(16).padStart(6, '0')
  return `#${complement}`
}
