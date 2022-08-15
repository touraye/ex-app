import axios from 'axios'

const API_URL = 'http://localhost:5000/api/users'

const getUsers = async () => {
	const response = await axios.get(API_URL)
	return response.data
}

const registerUser = async ( userData, token ) => {	
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		}
	
  const response = await axios.post(API_URL, userData, config)
  return response.data
}

const deleteUser = async ( id, token ) => {
	const config = {
		headers: { Authorization: `Bearer ${token}` },
	}

	const response = await axios.delete(`${API_URL}/${id}`, config)
	return response.data
}

const updateUser = async ( id, userData, token ) => {
	const config = {
		headers: { Authorization: `Bearer ${token}` },
	}

	const response = await axios.put(`${API_URL}/${id}`, userData, config)
	return response.data
}

const loginService = {
	getUsers,  
  registerUser,
  deleteUser,
  updateUser
}

export default loginService
