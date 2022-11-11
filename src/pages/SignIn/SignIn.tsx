import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import React from 'react';
import { Link } from 'react-router-dom';

import { SignInForm } from '../../components/SignInForm/SignInForm';

import { ROUTES } from '../../constants/routes';

export const SignIn = () => {
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
        boxShadow: 'md',
      }}
      variant="outlined"
    >
      <div>
        <Typography level="h4" component="h1">
          <b>Welcome!</b>
        </Typography>
        <Typography level="body2">Sign in to continue.</Typography>
      </div>
      <SignInForm />
      <Typography
        endDecorator={<Link to={`/${ROUTES.SIGN_UP.path}`}>Sign up</Link>}
        fontSize="sm"
        sx={{ alignSelf: 'center' }}
      >
        Don&apos;t have an account?
      </Typography>
    </Sheet>
  );
};
