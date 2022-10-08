import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Users from '../../pages/Users'
import Pagination from './Pagination'
import { getUsers } from '../../features/user/userSlice'

const UserPagination = () => {
	const { users, isLoading, isError } = useSelector(
		(state) => state.user
	)
	const dispatch = useDispatch()

	const [user, setUser] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [usersPerPage] = useState(5)

	useEffect(() => {
		if (isError) {
			console.log('Something went wrong!')
		}
		if (user.length <= 0) {
			dispatch(getUsers())
		}
		setUser(users)
	}, [dispatch, isError, users, user.length])

	// Get current user
	const indexOfLastUser = currentPage * usersPerPage
	const indexOfFirstUser = indexOfLastUser - usersPerPage
	const currentUsers = user.slice(indexOfFirstUser, indexOfLastUser)

	// Change page
	const paginateFront = () => setCurrentPage(currentPage + 1)
	const paginateBack = () => setCurrentPage(currentPage - 1)	

	return (
		<div>
			<Users userData={currentUsers} />
			<Pagination
				dataPerPage={usersPerPage}
				totalPosts={user.length}
				paginateBack={paginateBack}
				paginateFront={paginateFront}
				currentPage={currentPage}
			/>
		</div>
	)
}

export default UserPagination