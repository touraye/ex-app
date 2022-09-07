import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTransactions } from '../../features/transaction/transactionSlice'
import {curr} from '../../helpers'
import LineChart from './LineChart'

const IncomeExpenseLine = () => {
	const { transactions, isLoading, isMessage, isError } = useSelector(
		(state) => state.transaction
	)
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (isError) {
      alert(isMessage)
    }

    dispatch(getTransactions)
  }, [ dispatch, isError, isMessage ] )
  
  const incomeAndExpense = curr(transactions)

	const chartData = {
		labels: ['income', 'balance', 'expense'],
		datasets: [
			{
				label: 'Income And Expense',
				data: incomeAndExpense?.map((trans) => trans),
				backgroundColor: [
					'rgba(0, 128, 0, 0.658)',
					'rgba(112, 134, 146, 0.651)',
					'rgba(138, 8, 8, 0.651)',
				],
				borderColor: '#ccc',
				borderWidth: 2,
			},
		],
	}

	if (isLoading) <h2>...loading</h2>

	return <LineChart chartData={chartData} />
}

export default IncomeExpenseLine
