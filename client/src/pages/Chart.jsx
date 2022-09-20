import React from 'react'
import IncomeExpenseBar from '../components/Chart/IncomeExpenseBar'
import IncomeExpenseLine from '../components/Chart/IncomeExpenseLine'
import MonthlyTransaction from '../components/Chart/MonthlyTransaction'
import YearlyTransaction from '../components/Chart/YearlyTransaction'
const Chart = () => {
  return (
		<div>
			<IncomeExpenseBar />
			<IncomeExpenseLine />
			<MonthlyTransaction />
			<YearlyTransaction />
		</div>
	)
}

export default Chart
