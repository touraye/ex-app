import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AddTransaction from '../components/AddTransaction'
import { History } from '../components/History'

const Dashboard = () => {
  const { users } = useSelector( ( state ) => state.user )
  
  const [ show, setShow ] = useState( false )
  
	return (
		<div>
			<h4 className='balance-text'>your balance</h4>
			<p className='balance'>GMD 0.00</p>
			<div className='inc-exp-container'>
				<div>
					<h4>Income</h4>
					<p className='money plus'>$ 0.00</p>
				</div>
				<div>
					<h4>Expense</h4>
					<p className='money minus'>$ 0.00</p>
				</div>
      </div>
      <History />
      <h3>Add Transaction</h3>
      <AddTransaction />
		</div>
	)
}

export default Dashboard
