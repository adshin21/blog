import React, { Suspense } from 'react';
import { MainLayout } from './components/Layout';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { CircularProgress } from '@material-ui/core';

import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';  
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import Authenticated from './components/Authenticated';
export const history = createBrowserHistory();

const HomePage = React.lazy(() => import('./pages/HomePage'));
const CreateBlogPage = React.lazy(() => import('./pages/CreateBlogPage'));
const UserPage = React.lazy(() => import('./pages/UserPage'));
const BlogPost = React.lazy(() => import('./components/BlogPost'));

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/login" component={LogInPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/password/forgot" component={ForgotPasswordPage} />
        <Route exact path="/password/reset/confirm/:uid/:token" component={ResetPasswordPage} />
        <MainLayout>
          <Suspense fallback={<CircularProgress style={{ margin: 'auto', top: 'auto' }}/>}>
            <Route exact path="/"><Redirect to='/posts/page/1' /></Route>
            <Authenticated exact path="/create" comp={CreateBlogPage} />
            <Route exact path="/blogpost/:slug" component={BlogPost} />
            <Route exact path="/posts/page/:pagenumber" component={HomePage} />
            <Route exact path="/users/:username" component={UserPage} />
          </Suspense>
        </MainLayout>
        <Route path="*"><Redirect to='/posts/page/1' /></Route>
      </Switch>
    </Router>
  );
};

export default App;
