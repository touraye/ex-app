import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from '../../service/userService'

const initialState = {
	users: [],
	isLoading: false,
	isSuccess: false,
	isError: false,
	message: '',
}

export const getUser = createAsyncThunk(
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
			return await userService.registerUser(user)
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
	name: 'user',
	initialState,
	reducers: {
		reset(state) {
			state.isLoading = false
			state.isSuccess = false
			state.isError = false
			state.message = ''
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUser.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.user = action.payload
			})
			.addCase(getUser.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				state.user = null
			})
			.addCase(register.pending, (state) => {
				state.isLoading = true
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.user = action.payload
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				state.user = null
			})
	},
})

export const { reset } = userSlice.actions

export default userSlice.reducer
