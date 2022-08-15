import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { getUsers, register, reset } from '../features/user/userSlice'

const EditUser = ({ user, onEdit, showEditForm, setShowEditForm }) => {	
	console.log(user)
	const dispatch = useDispatch()
	const [username, setUsername] = useState(user.username)
	const [role, setRole] = useState(user.role)
	const [password, setPassword] = useState(user.role)
	const [password2, setPassword2] = useState('')

	const onSubmit = (e) => {
		e.preventDefault()

		if (role.length === 0) {
			return alert('Please select role')
		}

		if (password !== password2) {
			return alert('Password do not match')
		}

		onEdit({ username, password, role })
		// setShowEditForm(!showEditForm)
	}

	const editForm = () => setShowEditForm(!showEditForm)

	return (
		<form className='form modal' onSubmit={onSubmit}>
			<FaTimes className='close-btn' onClick={ editForm} />
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
			<div className='form-control'>
				<label htmlFor='password2'>Confirm Password </label>
				<input
					type='password'
					placeholder='Confirm password...'
					value={password2}
					onChange={(e) => setPassword2(e.target.value)}
					required
				/>
			</div>
			<button className='btn update-btn'>Update User</button>
		</form>
	)
}

export default EditUser
