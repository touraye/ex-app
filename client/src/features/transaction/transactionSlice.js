import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import transactionService from '../../service/transactionService'

const initialState = {
	transactions: [],
	isLoading: false,
	isSuccess: false,
	isError: false,
	isMessage: '',
}

export const getTransactions = createAsyncThunk(
	'transaction/get',
	async (_, thunkAPI) => {
		try {
			return await transactionService.getTransactions()
		} catch (error) {
			const message =
				(error.response && error.response.message && error.response.data) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)

export const createTransaction = createAsyncThunk(
	'trsansaction/create',
	async (trsansaction, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.auth.token			
			return await transactionService.createTransaction(trsansaction, token)
		} catch (error) {
			const message =
				(error.response && error.response.message && error.response.data) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)

export const deleteTransaction = createAsyncThunk(
	'transaction/delete',
	async (transactionId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.auth.token
			return await transactionService.deleteTransaction(transactionId, token)
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

export const updateTransaction = createAsyncThunk(
	'transaction/update',
	async (transactionData, thunkAPI) => {		
		try {
			const token = thunkAPI.getState().auth.auth.token
			return await transactionService.updateTransaction(transactionData.id, transactionData, token)
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

const transactionSlice = createSlice({
	name: 'transaction',
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
			.addCase(getTransactions.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getTransactions.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.transactions = action.payload
			})
			.addCase(getTransactions.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.isMessage = action.payload
				state.transactions = null
			})
			.addCase(createTransaction.pending, (state) => {
				state.isLoading = true
			})
			.addCase(createTransaction.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.transactions.push(action.payload)
			})
			.addCase(createTransaction.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.isMessage = action.payload
				state.transactions = null
			})
			.addCase(deleteTransaction.pending, (state) => {
				console.log(state);
				state.isLoading = true
			})
			.addCase( deleteTransaction.fulfilled, ( state, action ) => {
				state.isLoading = false
				state.isSuccess = true
				state.transactions = state.transactions.filter(user => user.id !== action.payload.id)
			})
			.addCase(deleteTransaction.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.isMessage = action.payload				
			})
	},
})

export const { reset } = transactionSlice.actions

export default transactionSlice.reducer
