import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './components/layout/Landing'
import Auth from './views/Auth'
import AuthContextProvider from './contexts/AuthContext'
import Dashboard from './views/Dashboard'
import ProtectedRoute from './components/routing/ProtectedRoute'
import PostContextProvider from './contexts/PostContext'
import CPKContextProvider from './contexts/CPKContext'
import CPTBLContextProvider from './contexts/CPTBLContext'
import MDKSContextProvider from './contexts/MDKSContext'
import CTHHContextProvider from './contexts/CTHHContext'

import CPK from './views/CPK'
import CPTBL from './views/CPTBL'
import MDKS from './views/MDKS'
import CTHH from './views/CTHH'
import PTHD from './views/PTHD'
import CPV from './views/CPV'
import CPTK from './views/CPTK'
function App() {
	return (
		<AuthContextProvider>
			<PostContextProvider>
				<Router>
					<Switch>
						<Route exact path='/' component={Landing} />
						<Route
							exact
							path='/login'
							render={props => <Auth {...props} authRoute='login' />}
						/>
						<Route
							exact
							path='/register'
							render={props => <Auth {...props} authRoute='register' />}
						/>
						<>
												
						<ProtectedRoute exact path='/PTHD' component={PTHD} />
						<ProtectedRoute exact path='/chiphivon' component={CPV} />
						<ProtectedRoute exact path='/chiphitrienkhai' component={CPTK} />

						<CPKContextProvider>
							<ProtectedRoute exact path='/chiphikhac' component={CPK} />
						</CPKContextProvider>
						
						
						<CPTBLContextProvider>
							<ProtectedRoute exact path='/chiphibaolanh' component={CPTBL} />{/* new */}
						</CPTBLContextProvider>
						<MDKSContextProvider>
							<ProtectedRoute exact path='/mandaykysu' component={MDKS} />
						</MDKSContextProvider>
						<CTHHContextProvider>
							<ProtectedRoute exact path='/chitiethanghoa' component={CTHH} />
						</CTHHContextProvider>
						
						{/* <ProtectedRoute exact path='/dashboard' component={Dashboard} /> */}
						
						</>

						
					</Switch>
				</Router>
			</PostContextProvider>
		</AuthContextProvider>
	)
}
export default App
