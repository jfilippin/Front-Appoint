import React from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate
} from 'react-router-dom';

import Login from './components/login';
import Appointment from './components/appointment';
import Register from './components/register';
import AppointList from './components/appointList';
import { isAuth } from './utils/auth';

function App() {
  return(
	<Router>
		<Routes>
			<Route path='/' element={<Login/>}/>
			
			<Route path='/register' element={<Register/>}/>

			<Route path='/appointList' element={<AppointList/>} render={() => (
				isAuth() ? <Navigate to='/appointList'/> : <AppointList/>
			)}/>

			<Route path='/appointment' render={() => (
				isAuth() ? <Navigate to='/appointment'/> : <Appointment/>
			)}/>
		</Routes>
	</Router>
  );
}

export default App;