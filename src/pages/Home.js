import BottomNav from '../components/BottomNav'
import Loading from '../components/Loading'
import NavBar from '../components/NavBar'
import Room from '../components/rooms/Room'
import Login from '../components/user/Login'
import Notification from '../components/user/Notification'

const Home = () => {
  return (
    <>
      <Loading />
      <Notification />
      <Login />
      <NavBar />
      <BottomNav />
      <Room />
    </>
  )
}

export default Home
