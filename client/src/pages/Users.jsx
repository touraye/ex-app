import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	getUsers,
	reset,
	deleteUser,
	register,
	updateUser,
} from '../features/user/userSlice'
import AddUser from '../components/AddUser'
import User from '../components/User'

const Users = ({userData}) => {
	const { users, isLoading, isMessage, isError } = useSelector( ( state ) => state.user )  
	const { auth } = useSelector( ( state ) => state )	
  const dispatch = useDispatch()
  const [ user, setUser ] = useState( [] )  
	const [ showForm, setShowForm ] = useState( false ) 	
	const [showEditForm, setShowEditForm] = useState(false)	
	const showEdit = ()=> setShowEditForm(!showEditForm)
	const foundUser = userData?.find((u) => u?.username === auth.username)	
  
  useEffect(() => {
		if (!isError) {
			console.log(isMessage)
		}

		if (user.length <= 0) {
			dispatch(getUsers())
		}
		
		setUser(users)
	}, [dispatch, isError, isMessage, user.length, users])
  
	const onShowForm = () => setShowForm( !showForm )
	
	const onAdd = ( data ) => {
		dispatch( register( data ) )
		dispatch(getUsers())     				
		dispatch( reset() )
	}	
	
	const onDelete = (id) => {
		dispatch(deleteUser(id))
		dispatch(reset())     
		dispatch(getUsers())     
	}	
	
		const onEdit = (userData) => {
			dispatch(updateUser(userData))
			dispatch(reset())
			dispatch(getUsers())
		}
  
  if(isLoading) <p>loading..</p>
  
  return (
		<div className='user-container'>
			<div className='flex'>
				<h2 className='balance-text'>user list</h2>
				{foundUser?.role === 'admin' && (
					<button onClick={() => onShowForm()} className='new-user-btn'>
						{showForm ? 'cancel' : 'new user'}
					</button>
				)}
			</div>
			{showForm && (
				<div>
					<AddUser
						onAdd={onAdd}
						onShowForm={onShowForm}						
					/>
				</div>
			)}
			<ul className='list'>
				{userData.length > 0 ? (
					userData?.map((user) => (
						<User
							key={user.id}
							data={user}
							user={user}
							onDelete={ onDelete }
							onEdit={ onEdit }
							foundUser={foundUser}
							showEdit={showEdit}
						/>
					))
				) : (
					<p>No user found</p>
				)}
			</ul>
		</div>
	)
}

export default Users
