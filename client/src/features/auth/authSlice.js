import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import loginService from '../../service/loginService'

const user = JSON.parse(localStorage.getItem('authUser'))

const initialState = {
	auth: user ? user : null,
}

export const login = createAsyncThunk(
	'auth/login',
  async ( userData, thunkAPI ) => {
    console.log(userData);
		try {
			return await loginService.login(userData)
		} catch (error) {
			const message =
				(error.response && error.response.message && error.response.data) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)

export const logout = createAsyncThunk(
	'auth/logout',
	async (_, thunkAPI) => {
		try {
			return await loginService.logout()
		} catch (error) {
			const message =
				(error.response && error.response.message && error.response.data) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)

const userSlice = createSlice({
	name: 'auth',
	initialState: user ? user : null,
	reducers: {
		setUser( state, action ) {
			return action.payload
		},
		 setLogout( state, action ) {
      return action.payload
    },
		// reset(state) {
		// 	state.isLoading = false
		// 	state.isSuccess = false
		// 	state.isError = false
		// 	state.isMessage = ''
		// },
	},
	// extraReducers: (builder) => {
	// 	builder
	// 		.addCase(login.pending, (state) => {
	// 			state.isLoading = true
	// 		})
	// 		.addCase(login.fulfilled, (state, action) => {
	// 			state.isLoading = false
	// 			state.isSuccess = true
	// 			state.auth = action.payload
	// 		})
	// 		.addCase(login.rejected, (state, action) => {
	// 			state.isLoading = false
	// 			state.isError = true
	// 			state.isMessage = action.payload
	// 			state.auth = null
	// 		})
	// 		.addCase(logout.pending, (state) => {
	// 			state.isLoading = true
	// 		})
	// 		.addCase(logout.fulfilled, (state, action) => {
	// 			state.isLoading = false
	// 			state.isSuccess = true
	// 			state.auth = null
	// 		})
	// 		.addCase(logout.rejected, (state, action) => {
	// 			state.isLoading = false
	// 			state.isError = true
	// 			state.isMessage = action.payload
	// 			state.auth = null
	// 		})
	// },
})

export const { setUser, setLogout, reset } = userSlice.actions

export const setLogin = (userData) => {
	return (dispatch) => {
		dispatch(setUser(userData))
	}
}

export const setLoggedOut = () => {
	return (dispatch) => {
		dispatch(setUser(null))
	}
}

export default userSlice.reducer
