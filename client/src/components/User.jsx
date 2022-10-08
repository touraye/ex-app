import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { FaEdit, FaTrash } from 'react-icons/fa'
import EditUser from './EditUser'
import { getUsers, reset, updateUser } from '../features/user/userSlice'

const User = ( {onEdit, user, data, onDelete, foundUser } ) => {
	const [ showEditForm, setshowEditForm ] = useState( false )	
	const dispatch = useDispatch()

	const handleShowEditForm = () => setshowEditForm(!showEditForm)



	return (
		<li className='item'>
			{showEditForm && (
				<EditUser
					onEdit={onEdit}
					user={user}
					handleShowEditForm={handleShowEditForm}
					data={data}
				/>
			)}
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
				{foundUser.role === 'admin' && (
					<>
						<FaEdit
							className='icon edit-icon'
							onClick={() => {
								handleShowEditForm()
							}}
						/>
						<FaTrash
							className='icon trash-icon'
							onClick={() => onDelete(user.id)}
						/>
					</>
				)}
			</div>
		</li>
	)
}

export default User