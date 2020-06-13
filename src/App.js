import React, { Suspense } from 'react';
import { MainLayout } from './components/Layout';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { CircularProgress } from '@material-ui/core';

import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';  
import Authenticated from './components/Authenticated';
export const history = createBrowserHistory();

const HomePage = React.lazy(() => import('./pages/HomePage'));
const CreatePage = React.lazy(() => import('./pages/CreateBlogPage'));
const BlogPost = React.lazy(() => import('./components/BlogPost'));

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/login" component={LogInPage} />
        <Route exact path="/signup" component={SignUpPage} />

        <MainLayout>
          <Suspense fallback={<CircularProgress />}>
            <Route exact path="/"><Redirect to='/posts/page/1' /></Route>
            <Authenticated exact path="/create" component={CreatePage} />
            <Route exact path="/blogpost/:slug" component={BlogPost} />
            <Route exact path="/posts/page/:pagenumber" component={HomePage} />
          </Suspense>
        </MainLayout>
        <Route path="*"><Redirect to='/posts/page/1' /></Route>
      </Switch>
    </Router>
  );
};

export default App;
