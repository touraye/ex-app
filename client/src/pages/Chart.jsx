import React from 'react'
import IncomeExpenseBar from '../components/Chart/IncomeExpenseBar'
import IncomeExpenseLine from '../components/Chart/IncomeExpenseLine'
import MonthlyTransaction from '../components/Chart/MonthlyTransaction'
const Chart = () => {
  return (
		<div>
			<IncomeExpenseBar />
			<IncomeExpenseLine />
			<MonthlyTransaction />
		</div>
	)
}

export default Chart
