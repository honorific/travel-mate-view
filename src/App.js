import Loading from './components/Loading'
import NavBar from './components/NavBar'
import Login from './components/user/Login'
import Notification from './components/user/Notification'

function App() {
  return (
    <>
      <Loading />
      <Notification />
      <Login />
      <NavBar />
    </>
  )
}

export default App
