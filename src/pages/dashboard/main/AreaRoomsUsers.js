import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const months = 5
const today = new Date()
const tempData = []
for (let i = 0; i < months; i++) {
  const date = new Date(
    today.getFullYear(),
    today.getMonth() - (months - (i + 1)),
  )
  tempData.push({
    date,
    name: date.getFullYear() + '/' + ('0' + (date.getMonth() + 1)).slice(-2),
    rooms: 0,
    users: 0,
  })
}
console.log('tempdata is: ', tempData)
const AreaRoomsUsers = () => {
  return (
    <div style={{width: '100%', height: 300, minWidth: 250}}>
      <ResponsiveContainer>
        <AreaChart
          data={tempData}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          {/* <CartesianGrid strokeDasharray='3 3' /> */}
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Area
            type='monotone'
            dataKey='uv'
            stackId='1'
            stroke='#8884d8'
            fill='#8884d8'
          />
          <Area
            type='monotone'
            dataKey='pv'
            stackId='1'
            stroke='#82ca9d'
            fill='#82ca9d'
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default AreaRoomsUsers
