import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getUsers, register, reset } from '../features/user/userSlice'

const AddUser = ( { onAdd, showForm, setShowForm } ) => {  
	const dispatch = useDispatch()	
	const [username, setUsername] = useState('')
  const [ role, setRole ] = useState( '' )
  const [password, setPassword] = useState('')
  const [ password2, setPassword2 ] = useState( '' )	    

	const onSubmit = (e) => {
		e.preventDefault()

		if (role.length === 0) {
			return alert('Please select role')
    }
    
    if (password !== password2) {
			return alert('Password do not match')
		}		
    
    onAdd( {username, password, role} )    			
    setShowForm(!showForm)
	}

	return (
		<form className='form newuser-form' onSubmit={onSubmit}>
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
					<option >Select role</option>
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
			<button className='btn'>Add User</button>
		</form>
	)
}

export default AddUser
