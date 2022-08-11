import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { FaUser, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import { logout, reset } from '../features/auth/authSlice'

const Header = () => {    
  const { auth, isLoading, isSuccess, isMessage, isError, } = useSelector( ( state ) => state.auth )
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect( () => {
    if ( isError ) {
      console.log('something went wrong!');
    }   

    if ( !auth ) {
      navigate('/login')
    }

      if ( auth ) {
      navigate('/')
    }
  }, [ isError, auth, navigate, isSuccess ] )
  
  const onLogout = () => {
    dispatch( logout() )
    dispatch( reset() )
    navigate('/login')
  }

  if(isLoading) return <h1>Loading...</h1>

  return (
    <header>
      <div className="logo">
        <Link to='/'>
          Expense App
        </Link>
      </div>      
      <ul>
        {
          auth ?
          <li>
              <Link to='/login'>
                <button onClick={onLogout}>
                  <FaSignOutAlt /> logout
                </button>
            </Link>
          </li>
            :
          <li>
            <FaSignInAlt /> login
          </li>
        }
      </ul>
    </header>
  )
}

export default Header
