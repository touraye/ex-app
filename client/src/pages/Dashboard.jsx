import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AddTransaction from '../components/AddTransaction'
import { History } from '../components/History'
import { getTransactions, reset } from '../features/transaction/transactionSlice'

const Dashboard = () => {
  const { transactions, isLoading, isMessage, isSuccess, isError } = useSelector( ( state ) => state.transaction )
  const { users } = useSelector((state) => state.user)
  const dispatch = useDispatch()
	const [ show, setShow ] = useState( false )


	
	useEffect( () => {
		if ( isError ) {
			alert(isMessage)
		}
		dispatch(getTransactions())
	}, [ dispatch, isMessage, isError ] )

		const income = transactions?.map((trans) => trans.amount)			
		const currIncome = income.length > 0 && income.reduce((acc, cur) => acc + cur)
		const expense = transactions
			?.filter((trans) => trans.type === 'expense')
			.map((trans) => trans.amount)			
	const currExpense = expense.length > 0 && expense.reduce((acc, cur) => acc + cur)
	const balance = currIncome - currExpense
	console.log('income', income, 'expense', expense, 'balance', balance)
	
	if(isLoading) <h2>...loading</h2>
  
	return (
		<div>
			<h4 className='balance-text'>your balance</h4>
			<p className='balance'>GMD {balance ? balance : '0.00'}</p>
			<div className='inc-exp-container'>
				<div>
					<h4>Income</h4>
					<p className='money plus'>GMD {currIncome ? currIncome : '0.00'}</p>
				</div>
				<div>
					<h4>Expense</h4>
					<p className='money minus'>GMD {currExpense ? currExpense : '0.00'}</p>
				</div>
			</div>
			<History transactions={transactions} />
			<h3>Add Transaction</h3>
			<AddTransaction />
		</div>
	)
}

export default Dashboard
