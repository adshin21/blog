import React, { Suspense } from 'react';

import { 
  MainLayout 
} from './components/Layout';

import { 
  Router, 
  Switch, 
  Route 
} from 'react-router-dom';

import { 
  createBrowserHistory
 } from 'history';

import { 
  CircularProgress 
} from '@material-ui/core';

import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';

export const history = createBrowserHistory();

const HomePage = React.lazy(() => import('./pages/HomePage'));


const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/login" component={LogInPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <MainLayout>
          <Suspense fallback={<CircularProgress />}>
            <Route exact path="/">
              <HomePage />
            </Route>
          </Suspense>
        </MainLayout>
      </Switch>
    </Router>
  );
};

export default App;
