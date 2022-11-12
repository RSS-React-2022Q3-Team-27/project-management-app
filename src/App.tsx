import './App.css';

import CssBaseline from '@mui/joy/CssBaseline';
import { CssVarsProvider } from '@mui/joy/styles';
import { useEffect } from 'react';
import { HashRouter as Router, Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import { Layout } from './components/Layout';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { ROUTES } from './constants/routes';
import { Board, Main, NotFound, Profile, SignIn, SignUp, Welcome } from './pages/';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { userLogOut } from './store/slices/user/userSlice';
import { getUsers } from './store/slices/users/usersThunks';
import { theme } from './utils/mui';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  const usersState = useAppSelector((state) => state.users);
  const navigate = useNavigate();
  const { users, getUsersErrorCode } = usersState;
  const { token, isUserLogIn } = userState;

  useEffect(() => {
    if (token && !isUserLogIn) {
      dispatch(getUsers());
    }
  }, [dispatch, isUserLogIn, token]);

  useEffect(() => {
    if (getUsersErrorCode) {
      dispatch(userLogOut());
      navigate(ROUTES.WELCOME.path);
    }
  }, [dispatch, getUsersErrorCode, navigate]);

  return (
    <CssVarsProvider theme={theme} defaultMode="system">
      <CssBaseline>
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
        <ToastContainer position="bottom-left" theme="colored" />
      </CssBaseline>
    </CssVarsProvider>
  );
}

export default App;
