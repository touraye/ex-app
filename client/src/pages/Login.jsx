import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../features/auth/authSlice'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const[username,setUsername]=useState('')
  const [ password, setPassword ] = useState( '' )  
  
  const onSubmit = ( e ) => {
    e.preventDefault()   

    const userData = {
      username,
      password,
    }

    dispatch( login( userData ) )
    navigate('/')
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          value={ username }
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Enter username'
          required />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="text"
          value={ password }
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Enter password'
          required />
      </div>
      <div>
        <input type="submit" value='LOGIN' />
      </div>
    </form>
  )
}

export default Login
