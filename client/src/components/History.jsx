export const History = ( { transactions } ) => {
  const trans = transactions?.map( trans => trans )    
  const lastTran = trans[ trans.length - 1 ]
  
  return (
		<div className='history'>
			<h3>latest transaction</h3>
			<div className='history-list'>
				<div className='flex-1'>
					<p>{lastTran?.name}</p>
					<p className={`${lastTran?.type === 'income' ? 'income' : 'expense'}`}>GMD {lastTran?.amount}</p>
				</div>
				<div>
					<p>{lastTran?.type}</p>
					<p>{new Date(lastTran?.createdAt).toLocaleString('en-US')}</p>
				</div>
			</div>
		</div>
	)
}
