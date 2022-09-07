import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {FaUser, FaEdit, FaSignOutAlt, FaUserSecret, FaKey } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { setLoggedOut } from '../features/auth/authSlice'
import { getUsers } from '../features/user/userSlice'

import EditUserPassword from '../components/EditUserPassword'

const Account = () => {
  const { auth } = useSelector( ( state ) => state )
  const { users, isLoading, isMessage, isSuccess, isError } = useSelector(
		(state) => state.user
	)

	const [ showBtn, setShowBtn ] = useState( false )
	const [showEditPasswordModal, setShowEditPasswordModal]=useState(false)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const user = users?.find( u => u.username === auth?.username )

  useEffect(() => {
		if (isError) {
			alert(isMessage)
		}

		if (user?.role === 'admin') {
			setShowBtn(true)
		}
		dispatch(getUsers())
	}, [dispatch, isMessage, isError, isSuccess, user?.role])

	
	const onLogout = () => {
		window.localStorage.clear()
		dispatch(setLoggedOut())
		navigate('/login')
	} 	

	const handleShowEditPasswordModal = ()=> setShowEditPasswordModal(!showEditPasswordModal)
  
  if(isLoading) <h2>...loading</h2>
  
  return (
		<div className='profile-card'>
			<div className='profile-cover'>
				<FaUser className='icon profile-icon' />
			</div>
			<div className='profile-detail'>
				{showEditPasswordModal && (
					<EditUserPassword
						user={user}
						handleShowEditPasswordModal={handleShowEditPasswordModal}
					/>
				)}
				<div className='profile-list'>
					<div className='username-icon'>
						<FaUser className='icon profile-icon-small no-act' />
					</div>
					<div className='username-detail'>
						<p>
							<small>Username</small>
						</p>
						<p>
							<strong>{user?.username}</strong>
						</p>
					</div>
					<div className='edit-username-icon'>
						{showBtn && <FaEdit className='icon profile-icon-small' />}
					</div>
				</div>

				<div className='profile-list'>
					<div className='username-role-icon'>
						<FaUserSecret className='icon profile-icon-small no-act' />
					</div>
					<div className='use-role-detail'>
						<p>
							<small>Role</small>
						</p>
						<strong>{user?.role}</strong>
					</div>
					<div className='edit-username-icon'>
						{showBtn && <FaEdit className='icon profile-icon-small' />}
					</div>
				</div>
				<div className='profile-list'>
					<div>
						<FaKey className='icon profile-icon-small no-act' />
					</div>
					<div>
						<strong>Edit your password</strong>
					</div>
					<div className='edit-username-icon'>					
							<FaEdit
								onClick={handleShowEditPasswordModal}
								className='icon profile-icon-small'
							/>						
					</div>
				</div>
				<div className='profile-list logout-deatail'>
					<button onClick={onLogout} className='btn logout-btn logout-btn-big'>
						<FaSignOutAlt className='icon logout-icon-small' /> logout
					</button>{' '}
				</div>
			</div>
		</div>
	)
}

export default Account