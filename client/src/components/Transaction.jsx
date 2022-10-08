import { useState } from 'react'
import { useSelector } from 'react-redux'
import { FaEdit, FaTrash } from 'react-icons/fa'
import EditTransaction from './EditTransaction'

const Transaction = ( {tran, onDelete} ) => {
  const {auth} = useSelector((state)=>state)
  const [showEditForm, setshowEditForm] = useState(false)

	const handleShowEditForm = () => setshowEditForm( !showEditForm )
	
  return (
		<li className='item' key={tran.id}>
			{showEditForm && (
				<EditTransaction
					transaction={tran}
					handleShowEditForm={handleShowEditForm}
				/>
			)}
			<div>
				<p>
					<strong>{tran.name}</strong>
				</p>
				<p>
					<strong>{tran.amount}</strong>
				</p>
				<div className='tran-type'>
					<p className={`${tran.type} === 'income' ? 'income' : 'expense'`}>
						{tran.type}
					</p>
				</div>
				<p>{new Date(tran.createdAt).toLocaleString('en-US')}</p>
			</div>
			<div className='icon-container'>
				{tran.user.username === auth?.username && (
					<>
						<FaEdit
							onClick={() => handleShowEditForm()}
							className='icon edit-icon'
						/>
						<FaTrash
							onClick={() => onDelete(tran.id)}
							className='icon trash-icon'
						/>
					</>
				)}
			</div>
		</li>
	)
}

export default Transaction