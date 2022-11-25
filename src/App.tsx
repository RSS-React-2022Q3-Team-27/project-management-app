import './App.css';

import CssBaseline from '@mui/joy/CssBaseline';
import { CssVarsProvider } from '@mui/joy/styles';
import React from 'react';

import { ToastContainer } from 'react-toastify';

import { useLogOutAfterTokenExp } from './hooks/useLogOutAfterTokenExp';
import { RoutesWrapper } from './RotesWrapper/RoutesWrapper';
import { theme } from './utils/mui';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  useLogOutAfterTokenExp();

  return (
    <CssVarsProvider theme={theme} defaultMode="system">
      <CssBaseline>
        <RoutesWrapper />
        <ToastContainer position="bottom-left" theme="colored" />
      </CssBaseline>
    </CssVarsProvider>
  );
}

export default App;
