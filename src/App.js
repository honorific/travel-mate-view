import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './pages/dashboard/Dashboard'
import Home from './pages/Home'
import Loading from './components/Loading'
import Notification from './components/user/Notification'
import Room from './components/rooms/Room'

const App = () => {
  return (
    <>
      <Loading />
      <Notification />
      <BrowserRouter>
        <Routes>
          <Route path='dashboard/*' element={<Dashboard />} />
          <Route path='*' element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Room />
    </>
  )
}

export default App
