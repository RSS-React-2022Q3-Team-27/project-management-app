import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { SignInForm } from '../../components/SignInForm/SignInForm';

import { ROUTES } from '../../constants/routes';
import { useAppSelector } from '../../store/hooks';

export const SignIn = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();
  const { isUserLogIn } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (isUserLogIn) {
      navigate(ROUTES.MAIN.path);
    }
  }, [isUserLogIn, navigate]);
  return (
    <Sheet
      sx={{
        width: 300,
        mx: 'auto',
        my: 4,
        py: 3,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRadius: 'sm',
        boxShadow: 'sm',
      }}
    >
      <div>
        <Typography level="h4" component="h1" sx={{ textAlign: 'center' }}>
          <b>{t('welcome')}</b>
        </Typography>
        <Typography level="body2" sx={{ textAlign: 'center' }}>
          {t('signInToContinue.')}
        </Typography>
      </div>
      <SignInForm />
      <Typography
        endDecorator={
          <Link to={`${ROUTES.SIGN_UP.path}`} style={{ textDecoration: 'none' }}>
            {t('signUp')}
          </Link>
        }
        fontSize="sm"
        sx={{ alignSelf: 'center' }}
      >
        {t('dontHaveAnAccount?')}
      </Typography>
    </Sheet>
  );
};
