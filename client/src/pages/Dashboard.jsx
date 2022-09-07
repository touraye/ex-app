import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AddTransaction from '../components/AddTransaction'
import { History } from '../components/History'
import { getTransactions } from '../features/transaction/transactionSlice'
import { curr } from '../helpers'
const Dashboard = () => {
  const { transactions, isLoading, isMessage, isError } = useSelector( ( state ) => state.transaction )  
  const dispatch = useDispatch()
	
	useEffect( () => {
		if ( isError ) {
			alert(isMessage)
		}
		dispatch(getTransactions())
	}, [ dispatch, isMessage, isError ] )

	const totalIncome = curr(transactions)[0]
	const totalBalance = curr(transactions)[1]
	const totalExpense = curr( transactions )[ 2 ]

	
	if(isLoading) <h2>...loading</h2>
  
	return (
		<div>
			<h4 className='balance-text'>your balance</h4>
			<p className='balance'>GMD {totalBalance ? totalBalance : '0.00'}</p>
			<div className='inc-exp-container'>
				<div>
					<h4>Income</h4>
					<p className='money plus'>GMD {totalIncome ? totalIncome : '0.00'}</p>
				</div>
				<div>
					<h4>Expense</h4>
					<p className='money minus'>GMD {totalExpense ? totalExpense : '0.00'}</p>
				</div>
			</div>
			<History transactions={transactions} />
			<h3>Add Transaction</h3>
			<AddTransaction />
		</div>
	)
}

export default Dashboard
