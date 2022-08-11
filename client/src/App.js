import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

import Dashboard from './pages/Dashboard'
import Login from './pages/Login';
import Transaction from './pages/Transaction'

function App() {
  return (
		<>
			<Router>
			  <Header />
				<main>
					<Routes>
						<Route path='/' element={<Dashboard />} />
						<Route path='/login' element={<Login />} />
						<Route path='/transaction' element={<Transaction />} />
					</Routes>
				</main>
			  <Footer />
			</Router>
		</>
	)
}

export default App;
