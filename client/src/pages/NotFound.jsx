import { FaExclamationTriangle } from 'react-icons/fa'
import {Link} from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='notfound-container'>
      <FaExclamationTriangle className='notfound-icon' />
			<h1>404</h1>
      <p>Sorry, this page does not exist </p>
      <Link to='/'>Go Back</Link>
		</div>
	)
}

export default NotFound
