import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getTransactions, reset, deleteTransaction } from '../features/transaction/transactionSlice'
import { FaEdit, FaTrash } from 'react-icons/fa'

const Transaction = () => {
  const { transactions, isLoading, isMessage, isSuccess, isError } = useSelector( ( state ) => state.transaction )  
  const { auth } = useSelector( ( state ) => state.auth )
  console.log(auth, 'transactions', transactions.map(trans=>trans.user))
  
  const dispatch = useDispatch()
  const [ showButton, setShowButton ] = useState( true )  

  useEffect(() => {
		if (isError) {
			alert(isMessage)
		}

		// if (auth?.username !== transactions?.user?.username) {
		// 	setShowButton(false)
		// }

		dispatch(getTransactions())
	}, [dispatch, isMessage, isError]) 

  const onDelete = ( id ) => {
    console.log(id);
    dispatch( deleteTransaction( id ) )
    dispatch( getTransactions() )
    dispatch(reset())
  }
  
  if(isLoading) <h2>...loading</h2>
  return (
		<ul className='list'>
			{transactions ? (
				transactions.map((tran) => (
					<li className='item' key={tran.id}>
						<div>
							<p>
								<strong>{tran.name}</strong>
							</p>
							<p>
								<strong>{tran.amount}</strong>
							</p>
							<div className='tran-type'>
								<p
									className={`${tran.type} === 'income' ? 'income' : 'expense'`}>
									{tran.type}
								</p>
							</div>
							<p>{new Date(tran.createdAt).toLocaleString('en-US')}</p>
						</div>
						<div className='icon-container'>
							<FaEdit className='icon edit-icon' />
							<FaTrash onClick={()=> onDelete(tran.id)} className='icon trash-icon' />
						</div>
					</li>
				))
			) : (
				<p>No transaction found</p>
			)}
		</ul>
	)
}

export default Transaction
