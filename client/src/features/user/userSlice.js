import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from '../../service/userService'

const initialState = {
	users: [],
	isLoading: false,
	isSuccess: false,
	isError: false,
	isMessage: '',
}

export const getUsers = createAsyncThunk(
	'user/get',
	async (_, thunkAPI) => {
		try {
			return await userService.getUsers()
		} catch (error) {
			const message =
				(error.response && error.response.message && error.response.data) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)

export const register = createAsyncThunk(
	'user/register',
	async (user, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.token			
			return await userService.registerUser(user, token)
		} catch (error) {
			const message =
				(error.response && error.response.message && error.response.data) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)

export const deleteUser = createAsyncThunk(
	'user/delete',
	async ( userId, thunkAPI ) => {		
		try {
			const token = thunkAPI.getState().auth.token
			return await userService.deleteUser(userId, token)
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)

export const updateUser = createAsyncThunk(
	'user/update',
	async (userData, thunkAPI) => {		
		try {				
			const data = {
				username: userData.username,
				status: userData.status,
				role: userData.role,
				password: userData.password,
			}
		
			const token = thunkAPI.getState().auth.token
			return await userService.updateUser(userData.id, data, token)
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		reset(state) {
			state.isLoading = false
			state.isSuccess = false
			state.isError = false
			state.isMessage = ''
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUsers.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getUsers.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.users = action.payload
			})
			.addCase(getUsers.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.isMessage = action.payload
				state.users = null
			})
			.addCase(register.pending, (state) => {
				state.isLoading = true
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.users.push(action.payload)
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.isMessage = action.payload
				state.users = null
			})
			.addCase(deleteUser.pending, (state) => {				
				state.isLoading = true
			})
			.addCase( deleteUser.fulfilled, ( state, action ) => {			
				state.isLoading = false
				state.isSuccess = true
				state.users = state.users.filter(user => user.id !== action.payload.id)
			})
			.addCase(deleteUser.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.isMessage = action.payload				
			} )
			.addCase( updateUser.pending, ( state ) => {
				state.isLoading = true
			} )
			.addCase( updateUser.fulfilled, ( state, action ) => {
				console.log('action.payload', action.payload)
				state.isLoading = false
				state.isSuccess = true
				// state.users.map( ( user ) => user.id !== action.payload.id ? user : action.payload )
				state.users.concat(action.payload)
			} )
			.addCase( updateUser.rejected, ( state, action ) => {
				state.isLoading = false
				state.isError = true
				state.isMessage = action.payload
			})
	},
})

export const { reset } = userSlice.actions

export default userSlice.reducer
