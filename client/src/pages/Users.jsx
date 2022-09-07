import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers, reset, deleteUser, register } from '../features/user/userSlice'
import AddUser from '../components/AddUser'
import User from '../components/User'

const Users = () => {
	const { users, isLoading, isMessage, isError } = useSelector( ( state ) => state.user )  
	const { auth } = useSelector( ( state ) => state )	
  const dispatch = useDispatch()
  const [ user, setUser ] = useState( [] )  
	const [ showForm, setShowForm ] = useState( false ) 	
	const [showEditForm, setShowEditForm] = useState(false)	
	const showEdit = ()=> setShowEditForm(!showEditForm)
	const foundUser = user?.find((u) => u?.username === auth.username)	
  
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
						showEdit={showEdit}
						setShowForm={setShowForm}
					/>
				</div>
			)}
			<ul className='list'>
				{user ? (
					user?.map((u) => (
						<User
							key={u.id}
							data={user}
							user={u}
							onDelete={onDelete}
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
