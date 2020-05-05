import React, { Suspense } from 'react';

import { MainLayout } from './components/Layout';

import { Router, Switch, Route } from 'react-router-dom';

import { createBrowserHistory } from 'history';

import { CircularProgress } from '@material-ui/core';

import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
export const history = createBrowserHistory();

const HomePage = React.lazy(() => import('./pages/HomePage'));
const CreatePage = React.lazy(() => import('./pages/CreateBlogPage'));

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/login" component={LogInPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <MainLayout>
          <Suspense fallback={<CircularProgress />}>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/create" component={CreatePage} />
          </Suspense>
        </MainLayout>
      </Switch>
    </Router>
  );
};

export default App;
