import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { FaBitcoin, FaCalculator, FaMoneyBill, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import { setLoggedOut } from '../features/auth/authSlice'

const Header = () => {    
  const { auth } = useSelector( ( state ) => state )  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect( () => {      
    if ( auth === null ) {
      navigate('/login')
    }
  }, [ auth, navigate ] )
  
  const onLogout = () => {    
    window.localStorage.clear()
    dispatch(setLoggedOut())    
    navigate('/login')
  }  

  return (
		<header className='header'>
      <div className='logo'>
        <FaMoneyBill className='icon logo-icon' />
				<Link to='/'>Expense App</Link>
			</div>
			<ul>
				{auth ? (
					<li className='loggedUser-list'>
						<p>{auth?.username}</p>
						<button onClick={onLogout} className='btn logout-btn logout-btn-sm'>
							<FaSignOutAlt className='icon logout-icon-ex-small' /> logout
						</button>
					</li>
				) : (
					<li>
						<button className='btn logout-btn logout-btn-sm'>
							<FaSignInAlt className='icon logout-icon-ex-small' /> login
						</button>
					</li>
				)}
			</ul>
		</header>
	)
}

export default Header
