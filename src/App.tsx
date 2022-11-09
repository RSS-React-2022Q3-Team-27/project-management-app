import './App.css';

import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import { ROUTES } from './constants/routes';
import { Board, Main, NotFound, Profile, SignIn, SignUp, Welcome } from './pages/';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path={ROUTES.WELCOME.path} element={<Welcome />} />
          <Route path={ROUTES.MAIN.path} element={<Main />} />
          <Route path={ROUTES.BOARD_ID.path} element={<Board />} />
          <Route path={ROUTES.PROFILE.path} element={<Profile />} />
          <Route path={ROUTES.SIGN_IN.path} element={<SignIn />} />
          <Route path={ROUTES.SIGN_UP.path} element={<SignUp />} />
          <Route path={ROUTES.NOT_FOUND.path} element={<NotFound />} />
          <Route path={ROUTES.ALL.path} element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
