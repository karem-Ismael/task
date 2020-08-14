import React from 'react';
import Signin from './user/Signin'
import PrivateRoute from './auth/PrivateRoute'
import Home from './core/Home'

import {
  BrowserRouter ,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>

                <Switch>
                    <PrivateRoute path='/' exact component={Home} />
                    <Route path='/signin' exact component={Signin} />
                 
                </Switch>
        </BrowserRouter>    
    
  );
}

export default App;
