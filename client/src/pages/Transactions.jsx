import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getTransactions, reset, deleteTransaction } from '../features/transaction/transactionSlice'
import Transaction from '../components/Transaction'

const Transactions = ({transData}) => {
  const { transactions, isLoading, isMessage, isError } = useSelector( ( state ) => state.transaction )     

	const dispatch = useDispatch()		

  useEffect(() => {
		if (isError) {
			alert(isMessage)
		}

		dispatch( getTransactions() )
	}, [ dispatch, isMessage, isError ] ) 	

	
  const onDelete = ( id ) => {    
    dispatch( deleteTransaction( id ) )
    dispatch( getTransactions() )
    dispatch(reset())
  }
  
  if(isLoading) <h2>...loading</h2>
  return (
		<ul className='list'>
			{transData.length > 0 ? (
				transData.map((tran) => (
					<Transaction key={tran.id} tran={tran} onDelete={onDelete} />
				))
			) : (
				<p>No transaction found</p>
			)}
		</ul>
	)
}

export default Transactions
