import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers, reset, deleteUser, register } from '../features/user/userSlice'
import AddUser from '../components/AddUser'

import User from '../components/User'
import EditUser from '../components/EditUser'

const Users = () => {
	const { users, isLoading, isSuccess, isMessage, isError } = useSelector( ( state ) => state.user )  
	const { auth } = useSelector( ( state ) => state.auth )	
  const dispatch = useDispatch()
  const [ user, setUser ] = useState( [] )  
	const [ showForm, setShowForm ] = useState( false ) 
	const [ showBtn, setShowBtn ] = useState( false )	
	const [showEditForm, setShowEditForm] = useState(false)	
	const fondUser = user.find((u) => u.username === auth.username)
	const showEdit = ()=> setShowEditForm(!showEditForm)
	console.log('fondUser', fondUser, showBtn)
  
  useEffect(() => {
		if (!isError) {
			console.log(isMessage)
		}

		if (user.length <= 0) {
			dispatch(getUsers())
		}

		if (fondUser?.role === 'admin') {
			setShowBtn(true)
		}

		setUser(users)
	}, [dispatch, isError, isMessage, user.length, users, fondUser?.role])
  
	const onShowForm = () => setShowForm( !showForm )
	
	const onAdd = ( data ) => {
		dispatch( register( data ) )
		dispatch(getUsers())     		
		// setUser( [...user, data] )
		dispatch( reset() )
	}

	console.log( user )
	
   const onDelete = (id) => {
			dispatch(deleteUser(id))
			dispatch(reset())
     user.filter( u => u.id !== id )	
			dispatch(getUsers())     
	 }
	
	const onEdit = ()=>{}
  
  if(isLoading) <p>loading..</p>
  
  return (
		<div className='user-container'>
			<div className='flex'>
				<h2 className='balance-text'>user list</h2>
				<button onClick={() => onShowForm()} className='new-user-btn'>
					{showForm ? 'cancel' : 'new user'}
				</button>
			</div>
			{showForm && (
				<div>
					{showBtn && (
						<AddUser
							onAdd={onAdd}
							showEdit={showEdit}
							setShowForm={setShowForm}
						/>
					)}
				</div>
			)}
			{showEdit && (
				<EditUser
					user={user}
					onEdit={onEdit}
					showEditForm={showEditForm}
					setShowEditForm={setShowEditForm}
				/>
			)}
			<ul className='list'>
				{user ? (
					user?.map((u) => (
						<User
							key={u.id}
							user={u}
							onDelete={onDelete}
							showBtn={showBtn}
							setShowBtn={setShowBtn}
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
