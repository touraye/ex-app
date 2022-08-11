import axios from 'axios'

const API_URL = 'http://localhost:5000/api/login'

const login = async ( userData ) => {  
  const response = await axios.post( API_URL, userData )
  console.log(response.data);
  
  if ( response ) {
    localStorage.setItem('authUser', JSON.stringify(response.data))
  }
  
	return response.data
}

const logout = () => {
  localStorage.removeItem('authUser')
}

const loginService = {
  login,  
  logout
}

export default loginService
