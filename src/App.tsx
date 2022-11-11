import './App.css';

import CssBaseline from '@mui/joy/CssBaseline';
import { CssVarsProvider } from '@mui/joy/styles';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { ROUTES } from './constants/routes';
import { Board, Main, NotFound, Profile, SignIn, SignUp, Welcome } from './pages/';
import { theme } from './utils/mui';

function App() {
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
      </CssBaseline>
    </CssVarsProvider>
  );
}

export default App;
