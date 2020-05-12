import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Users from './user/pages/Users';
import MainNavigation from './shared/components/Navigation/MainNavigation/MainNavigation';
import NewPlace from './places/pages/NewPlace/NewPlace';
import UserPlaces from './places/pages/UserPlaces/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace/UpdatePlace';
import Auth from './user/pages/Auth/Auth';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

const App = () => {
  const { token, login, logout, userId } = useAuth(false);

  let routes;

  if (token) routes = (
    <Switch>
      <Route
        path='/'
        exact>
        <Users />
      </Route>
      <Route
        path='/:userId/places'
        exact>
        <UserPlaces />
      </Route>
      <Route
        path='/places/new'
        exact>
        <NewPlace />
      </Route>
      <Route
        path='/places/:placeId'
        exact>
        <UpdatePlace />
      </Route>
      <Redirect to='/' />
    </Switch>
  );
  else routes = (
    <Switch>
      <Route
        path='/'
        exact>
        <Users />
      </Route>
      <Route
        path='/:userId/places'
        exact>
        <UserPlaces />
      </Route>
      <Route
        path='/auth'
        exact>
        <Auth />
      </Route>
      <Redirect to='/auth' />
    </Switch>
  );

  return (
    <AuthContext.Provider
      value={ {
        isLoggedIn: !!token, // The !! (double bang) logical operators return a value’s truthy value.
        token: token,
        userId: userId,
        login: login,
        logout: logout
      } }>
      <Router>
        <MainNavigation />
        <main>{ routes }</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
