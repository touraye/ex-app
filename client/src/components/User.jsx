import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { deleteUser, getUsers } from '../features/user/userSlice'

const User = ( { user, onDelete, showBtn, setShowBtn } ) => { 
	const [ showEditForm, setShowEditForm ] = useState( false )	
  const dispatch = useDispatch()
	const navigate = useNavigate()
	
  const onEdit = ( id ) => {
    
  }
  
	const handleShowEditForm = ( ) => {  }
	
  return (
		<li className='item'>
			<div className='user-list'>
				<h4>{user.username}</h4>
				<div className='user-status'>
					<p className={`${user.status} === 'active' ? 'active' : 'suspend'`}>
						{user.status}
					</p>
					<p>{user.role}</p>
				</div>
			</div>
			<div className='action-container'>
				{showBtn && (
					<>
						{' '}
						<FaEdit
							style={{ color: 'green', cursor: 'pointer' }}
							onClick={ () => {
								onEdit( user.id )
								handleShowEditForm()
							}
							}
						/>
						<FaTrash
							style={{ color: 'red', cursor: 'pointer' }}
							onClick={() => onDelete(user.id)}
						/>{' '}
					</>
				)}
			</div>
		</li>
	)
}

export default User