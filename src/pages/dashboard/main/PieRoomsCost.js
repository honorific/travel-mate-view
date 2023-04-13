import {Box, Stack, Typography} from '@mui/material'
import {PieChart, Pie, Cell, Tooltip} from 'recharts'
import {useValue} from '../../../context/ContextProvider'
import {useEffect, useState} from 'react'

const COLORS = ['#00C49F', '#0088FE', '#FFBB28', '#FF8042']

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.2
  const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.5

  return (
    <text
      x={x}
      y={y}
      fill='white'
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline='central'
      style={{fontSize: '12px'}}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}
const PieRoomsCost = () => {
  const {
    state: {rooms},
  } = useValue()
  const [costGroups, setCostGroups] = useState([])
  useEffect(() => {
    let free = 0,
      lessThan15 = 0,
      between15And35 = 0,
      moreThan35 = 0
    rooms.map((room) => {
      if (room.price === 0) return free++
      if (room.price < 15) return lessThan15++
      if (room.price <= 35) return between15And35++
      return moreThan35++
    })
    setCostGroups([
      {name: 'free', qty: free},
      {name: 'less than $15', qty: lessThan15},
      {name: 'between $15 and $35', qty: between15And35},
      {name: 'more than $35', qty: moreThan35},
    ])
  }, [rooms])

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
      }}
    >
      <PieChart width={200} height={200}>
        <Pie
          data={costGroups}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={90}
          fill='#8884d8'
          dataKey='qty'
        >
          {costGroups.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <Stack gap={2}>
        <Typography variant='h6'>Rooms cost</Typography>
        <Box sx={{display: 'flex', gap: 3, flexWrap: 'wrap'}}>
          {COLORS.map((color, i) => (
            <Stack key={color} alignItems='center' spacing={1}>
              <Box sx={{height: 20, width: 20, background: color}} />
              <Typography variant='body2' sx={{opacity: 0.7}}>
                {costGroups[i]?.name}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Stack>
    </Box>
  )
}

export default PieRoomsCost
