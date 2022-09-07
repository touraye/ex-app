import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { FaTimes } from 'react-icons/fa'

import { updateUser, getUsers } from '../features/user/userSlice'

const EditUserPassword = ( { user, handleShowEditPasswordModal } ) => {
  console.log('user', user)
	const [ password, setPassword ] = useState(user.password)
  const [ password2, setPassword2 ] = useState( '' )
  
  const dispatch = useDispatch()

  const onSubmit = ( e ) => {
    e.preventDefault()

    if ( password !== password2 ) {
      return alert('Password do not match!')
    }

    const newPassword = {
      id: user.id,
      password
    }

    dispatch(updateUser(newPassword))
    dispatch( getUsers() )
    handleShowEditPasswordModal()
  }

	return (
		<form className='form modal edit-user-modal' onSubmit={onSubmit}>
			<div className='close-btn-container'>
				<FaTimes className='close-btn' onClick={() => handleShowEditPasswordModal()} />
			</div>
			<div className='form-control'>
				<label htmlFor='password'>Password </label>
				<input
					type='password'
					placeholder='Enter new password...'
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

export default EditUserPassword
