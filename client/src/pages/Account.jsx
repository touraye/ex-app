import { useEffect } from 'react'
import {FaUser, FaEdit, FaSignOutAlt, FaUserSecret } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers, reset } from '../features/user/userSlice'

const Account = () => {
  const { auth } = useSelector( ( state ) => state.auth )
  const { users, isLoading, isMessage, isSuccess, isError } = useSelector(
		(state) => state.user
	)
  const dispatch = useDispatch()
  useEffect( () => {
    if ( isError ) {
      alert( isMessage)
    }
  
    dispatch( getUsers())
  }, [dispatch, isMessage, isError, isSuccess])

  const user = users?.find( u => u.username === auth.username )
  const onLogout = ()=>{}
  
  if(isLoading) <h2>...loading</h2>
  
  return (
		<div className='profile-card'>
			<div className='profile-cover'>
				<FaUser className='icon profile-icon' />
			</div>
			<div className='profile-detail'>
				<div className='profile-list'>
					<FaUser className='icon' />
					<div>
						<p>
							<small>Username</small>
						</p>
						<p>
							<strong>{user?.username}</strong>
						</p>
					</div>
				</div>

				<div className='profile-list'>
					<FaUserSecret />
					<div>
						<p>
							<small>Role</small>
						</p>
						<strong>{user?.role}</strong>
					</div>
				</div>

				<p>
					<strong>Edit user</strong> <FaEdit />
				</p>
				<p>
					{auth?.username}
					<button onClick={onLogout}>
						<FaSignOutAlt /> logout
					</button>{' '}
				</p>
			</div>
		</div>
	)
}

export default Account