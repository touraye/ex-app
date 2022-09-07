import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaUser, FaHome, FaMoneyCheck, FaList, FaChartBar } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
	const { auth } = useSelector( ( state ) => state )
	
	const [ showMenu, setShowMenu ] = useState( false )

	useEffect( () => {
		if ( auth ) {
			setShowMenu(true)
		}
	}, [auth])
	
	return (
		<>
			{
				showMenu &&
				<footer className='footer'>
					<ul>
						<li>
							<Link to='/'>
								<FaHome />
							</Link>
						</li>
						<li>
							<Link to='/users'>
								<FaList />
							</Link>
						</li>
						<li>
							<Link to='/transactions'>
								<FaMoneyCheck />
							</Link>
						</li>
						<li>
							<Link to='/statistic'>
								<FaChartBar />
							</Link>
						</li>
						<li>
							<Link to='/account'>
								<FaUser />
							</Link>
						</li>
					</ul>
				</footer>
			
			}
		</>
	)
}

export default Footer
