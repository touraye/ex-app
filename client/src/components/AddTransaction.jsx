import {useState} from 'react'

const AddTransaction = () => {
  const[name,setName]=useState('')
  const[type,setType]=useState('')
  const [ amount, setAmount ] = useState( '' )
  
  const onSubmit = (e) => {
    e.preventDefault()

    if ( type.length === 0 ) {
      return alert('Please select type')
    }

    const newTransaction = {
      name,
      type,
      amount,
    }

    console.log(newTransaction)
  }

	return (
		<form className='form transaction-form' onSubmit={onSubmit}>
			<div className='form-control'>
				<label htmlFor='text'>Name</label>
				<input
					type='text'
					placeholder='Enter name...'
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>
			</div>
			<div className='form-control'>
				<label htmlFor='text'>Transaction Type</label>
				<select
					name='type'
					value={type}
					onChange={(e) => setType(e.target.value)}
					required>
					<option>select type</option>
					<option value='income'>income</option>
					<option value='income'>expense</option>
				</select>
			</div>
			<div className='form-control'>
				<label htmlFor='amount'>Amount </label>
				<input
					type='number'
					placeholder='Enter amount...'
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					required
				/>
			</div>
			<button className='btn'>Add transaction</button>
		</form>
	)
}

export default AddTransaction
