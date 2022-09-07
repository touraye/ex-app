import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLogin } from '../features/auth/authSlice'
import loginService from '../service/loginService'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const[username,setUsername]=useState('')
  const [ password, setPassword ] = useState( '' )  
  
  const onSubmit = async( e ) => {
    e.preventDefault()   

    try {      

      await loginService.login({
        username,
        password,
      })
       
      const loggedUser = JSON.parse(window.localStorage.getItem('authUser'))
  
      // dispatch( login( userData ) )
      dispatch(setLogin(loggedUser))
      navigate('/')
    } catch (error) {
      console.log('wrong username or password!');
    }

  }

  return (
		<form onSubmit={onSubmit} className='form'>
			<div className='form-control'>
				<label htmlFor='username'>Username:</label>
				<input
					type='text'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder='Enter username'
					required
				/>
			</div>
			<div className='form-control'>
				<label htmlFor='password'>Password:</label>
				<input
					type='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder='Enter password'
					required
				/>
			</div>
			<div className='form-control'>
				<input type='submit' value='LOGIN' className='btn login-btn' />
			</div>
		</form>
	)
}

export default Login
