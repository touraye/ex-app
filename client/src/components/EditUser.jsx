import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateUser, getUsers } from '../features/user/userSlice'
import { FaTimes } from 'react-icons/fa'

const EditUser = ( { user, data, handleShowEditForm } ) => {	
	console.log('data', data);
	const [username, setUsername] = useState(user.username)
	const [status, setStatus] = useState(user.status)
	const [role, setRole] = useState(user.role)
	const [password, setPassword] = useState(user.role)	
	
	const dispatch = useDispatch()

	const onSubmit = (e) => {
		e.preventDefault()

		if (role.length === 0 || status.length === 0) {
			return alert('Please select role or a status')
		}
		
		const userData = {
			id: user.id,
			username,
			status,
			role,
			password,
		}

		dispatch(updateUser(userData))
		handleShowEditForm()				
	}

	

	return (
		<form className='form modal' onSubmit={onSubmit}>
			<div className='close-btn-container'>
				<FaTimes className='close-btn' onClick={() => handleShowEditForm()} />
			</div>
			<div className='form-control'>
				<label htmlFor='text'>Username</label>
				<input
					type='text'
					placeholder='Enter username...'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
			</div>
			<div className='form-control'>
				<label htmlFor='text'>User Status</label>
				<select
					name='status'
					value={status}
					onChange={(e) => setStatus(e.target.value)}
					required>
					<option>Select status</option>
					<option value='active'>active</option>
					<option value='suspend'>suspend</option>
				</select>
			</div>
			<div className='form-control'>
				<label htmlFor='text'>User Role</label>
				<select
					name='role'
					value={role}
					onChange={(e) => setRole(e.target.value)}
					required>
					<option>Select role</option>
					<option value='user'>user</option>
					<option value='admin'>admin</option>
				</select>
			</div>
			<div className='form-control'>
				<label htmlFor='password'>Password </label>
				<input
					type='password'
					placeholder='Enter password...'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
			</div>
			{/* <div className='form-control'>
				<label htmlFor='password2'>Confirm Password </label>
				<input
					type='password'
					placeholder='Confirm password...'
					value={password2}
					onChange={(e) => setPassword2(e.target.value)}
					required
				/>
			</div> */}
			<button className='btn update-btn'>Update User</button>
		</form>
	)
}

export default EditUser
