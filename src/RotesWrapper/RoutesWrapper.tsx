import React, { useReducer } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import { Layout } from '../components/Layout/Layout';

import 'react-toastify/dist/ReactToastify.css';

import { PrivateRoute } from '../components/PrivateRoute/PrivateRoute';
import { ROUTES } from '../constants/routes';
import { ContextProvider } from '../Context/Context';

import { contextReducer } from '../Context/contextReducer/contextReducer';
import { initialReducerState } from '../Context/contextReducer/initialReducerState';
import { Board, Main, NotFound, Profile, SignIn, SignUp, Welcome } from '../pages';

export const RoutesWrapper = () => {
  const [contextState, contextDispatch] = useReducer(contextReducer, initialReducerState);
  return (
    <ContextProvider value={{ contextState, contextDispatch }}>
      <Router>
        <Routes>
          <Route path={ROUTES.ROOT.path} element={<Layout />}>
            <Route index element={<Welcome />} />
            <Route path={ROUTES.WELCOME.path} element={<Welcome />} />
            <Route
              path={ROUTES.MAIN.path}
              element={
                <PrivateRoute>
                  <Main />
                </PrivateRoute>
              }
            />
            <Route
              path={ROUTES.BOARD_ID.path}
              element={
                <PrivateRoute>
                  <Board />
                </PrivateRoute>
              }
            />
            <Route
              path={ROUTES.PROFILE.path}
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path={ROUTES.SIGN_IN.path} element={<SignIn />} />
            <Route path={ROUTES.SIGN_UP.path} element={<SignUp />} />
            <Route path={ROUTES.NOT_FOUND.path} element={<NotFound />} />
            <Route path={ROUTES.ALL.path} element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </ContextProvider>
  );
};
