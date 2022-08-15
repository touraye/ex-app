import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

import Dashboard from './pages/Dashboard'
import Login from './pages/Login';
import Transaction from './pages/Transaction'
import Users from './pages/Users'
import NotFound from './pages/NotFound';

function App() {
  return (
		<div className='container'>
			<Router>
				<Header />
				<main className='main'>
					<Routes>
						<Route path='/' element={<Dashboard />} />
						<Route path='/login' element={<Login />} />
						<Route path='/transactions' element={<Transaction />} />
						<Route path='/users' element={<Users />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
				</main>
				<Footer />
			</Router>
		</div>
	)
}

export default App;
