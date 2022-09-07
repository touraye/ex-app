import axios from 'axios'

const API_URL = 'http://localhost:5000/api/transactions'

const getTransactions = async () => {
	const response = await axios.get(API_URL)
	return response.data
}

const createTransaction = async (userData, token) => {
	const config = {
		headers: { Authorization: `Bearer ${token}` },
	}

	const response = await axios.post(API_URL, userData, config)
	return response.data
}

const deleteTransaction = async (id, token) => {
	const config = {
		headers: { Authorization: `Bearer ${token}` },
	}

	const response = await axios.delete( `${API_URL}/${id}`, config )	
	console.log('response.data', response.data)
	return response.data
}

const updateTransaction = async (id, userData, token) => {
	const config = {
		headers: { Authorization: `Bearer ${token}` },
	}

	const response = await axios.put(`${API_URL}/${id}`, userData, config)
	return response.data
}

const loginService = {
	getTransactions,
	createTransaction,
	deleteTransaction,
	updateTransaction,
}

export default loginService
