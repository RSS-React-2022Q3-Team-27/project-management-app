import './App.css';

import CssBaseline from '@mui/joy/CssBaseline';
import { CssVarsProvider } from '@mui/joy/styles';
import { useEffect } from 'react';

import { ToastContainer } from 'react-toastify';

import { useLogOutAfterTokenExp } from './hooks/useLogOutAfterTokenExp';
import { RoutesWrapper } from './RotesWrapper/RoutesWrapper';
import i18n from './translation/i18n';
import { AppLanguage } from './types/LanguageOptions';
import { getUserLocale } from './utils/getUserLocale';
import { theme } from './utils/mui';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  useLogOutAfterTokenExp();

  useEffect(() => {
    i18n.changeLanguage(getUserLocale() ? AppLanguage.ru : AppLanguage.en);
  }, []);

  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline>
        <RoutesWrapper />
        <ToastContainer position="bottom-left" theme="colored" autoClose={3000} />
      </CssBaseline>
    </CssVarsProvider>
  );
}

export default App;
