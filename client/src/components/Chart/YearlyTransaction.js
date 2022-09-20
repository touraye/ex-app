import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getTransactions } from '../../features/transaction/transactionSlice'
import PieChart from './PieChart'

const YearlyTransaction = () => {
  const { transactions, isLoading, isError, isMessage } = useSelector( ( state ) => state.transaction )
  const dispatch = useDispatch()
  
  useEffect( () => {
    if ( isError ) {
      console.log(isMessage)
    }

    dispatch(getTransactions())
  }, [ isError, isMessage, dispatch ] )
  
  if ( isLoading ) return <h3>...loading</h3>

  const incomeAndExpense = [300, 400, 0, 900, 500, 900, 1200, 4000, 8000, 0, 0,0]
  
    const chartData = {
			labels: [
				'jan',
				'feb',
				'mar',
				'apl',
				'may',
				'jun',
				'jul',
				'agst',
				'sept',
				'oct',
				'nov',
				'dec',
			],
			datasets: [
				{
					label: 'Yealy Transaction',
					data: incomeAndExpense?.map((trans) => trans),
					backgroundColor: [
						'rgba(0, 128, 0, 0.658)',
						'rgba(112, 134, 146, 0.651)',
						'rgba(138, 8, 8, 0.651)',
						'rgb(30, 219, 178)',
						'rgba(124, 167, 6, 0.651)',
						'rgba(38, 8, 8, 0.651)',
						'yellow',
						'pink',
						'blue',
						'rgb(238, 159, 12)',
						'rgba(2, 47, 105, 0.986)',
						'rgb(83, 42, 102)',
					],
					borderColor: '#ccc',
					borderWidth: 2,
				},
			],
		}

  return <PieChart chartData={chartData} />
}

export default YearlyTransaction
