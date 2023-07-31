import {Switch as Routes, Route} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Signup from './components/SignupForm'
import Home from './components/Home'

const App = () => {
  return (
    <Routes>
      <Route exact path='/login' component={LoginForm} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/' component={Home} />
    </Routes>
  )
}

export default App