import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import {useValue} from '../../../context/ContextProvider'
import {useEffect, useState} from 'react'

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

const AreaRoomsUsers = () => {
  const {
    state: {rooms, users},
  } = useValue()
  console.log('tempdata is: ', tempData)
  const [data, setData] = useState([])
  useEffect(() => {
    for (let i = 0; i < months; i++) {
      tempData[i].users = 0
    }
    users.forEach((user) => {
      for (let i = 0; i < months; i++) {
        if (
          new Date(tempData[i].date).getMonth() ==
          new Date(user?.createdAt).getMonth()
        ) {
          return tempData[i].users++
        }
      }
    })
    setData([...tempData])
  }, [users])

  useEffect(() => {
    for (let i = 0; i < months; i++) {
      tempData[i].rooms = 0
    }
    rooms.forEach((room) => {
      for (let i = 0; i < months; i++) {
        if (
          new Date(tempData[i].date).getMonth() ==
          new Date(room?.createdAt).getMonth()
        ) {
          return tempData[i].rooms++
        }
      }
    })
    setData([...tempData])
  }, [rooms])
  return (
    <div style={{width: '100%', height: 300, minWidth: 250}}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
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
            dataKey='users'
            stackId='1'
            stroke='#8884d8'
            fill='#8884d8'
          />
          <Area
            type='monotone'
            dataKey='rooms'
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
