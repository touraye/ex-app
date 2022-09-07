import { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { getTransactions } from '../../features/transaction/transactionSlice'

import { monthlyExpense } from '../../helpers'
import { BarChart } from './Chart'

const MonthlyTransaction = () => {
  const { transactions, isError, isMessage, isLoading } = useSelector( ( state ) => state.transaction )
  const dispatch = useDispatch( )
  
  useEffect( () => {
    if ( isError ) {
      console.log(isMessage);
    }

    dispatch(getTransactions())
  }, [isError, isMessage, dispatch] )
  
  if ( isLoading ) return <h3>...loading</h3>
  
  const transactionOfTheMonth = monthlyExpense( transactions )
  

    const chartData = {
			labels: ['income', 'expense'],
			datasets: [
				{
					label: 'Monthly Income And Expense',
					data: transactionOfTheMonth?.map((trans) => trans),
					backgroundColor: [
						'rgba(0, 128, 0, 0.658)',				
						'rgba(138, 8, 8, 0.651)',
					],
					borderColor: '#ccc',
					borderWidth: 2,
				},
			],
		}
  
  return <BarChart chartData={chartData} />
}

export default MonthlyTransaction
