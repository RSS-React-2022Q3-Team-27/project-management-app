import './App.css';

import CssBaseline from '@mui/joy/CssBaseline';
import { CssVarsProvider } from '@mui/joy/styles';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import { Layout } from './components/Layout';
import { ROUTES } from './constants/routes';
import { Board, Main, NotFound, Profile, SignIn, SignUp, Welcome } from './pages/';
import { theme } from './utils/mui';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <CssVarsProvider theme={theme} defaultMode="system">
      <CssBaseline>
        <Router>
          <Routes>
            <Route path={ROUTES.MAIN.path} element={<Layout />}>
              <Route path={ROUTES.WELCOME.path} element={<Welcome />} />
              <Route index element={<Main />} />
              <Route path={ROUTES.BOARD_ID.path} element={<Board />} />
              <Route path={ROUTES.PROFILE.path} element={<Profile />} />
              <Route path={ROUTES.SIGN_IN.path} element={<SignIn />} />
              <Route path={ROUTES.SIGN_UP.path} element={<SignUp />} />
              <Route path={ROUTES.NOT_FOUND.path} element={<NotFound />} />
              <Route path={ROUTES.ALL.path} element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
        <ToastContainer />
      </CssBaseline>
    </CssVarsProvider>
  );
}

export default App;
