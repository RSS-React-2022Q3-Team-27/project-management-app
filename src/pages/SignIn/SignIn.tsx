import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Button from '@mui/joy/Button';

import Sheet from '@mui/joy/Sheet';
import TextField from '@mui/joy/TextField';
import Typography from '@mui/joy/Typography';
import React, { useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { ROUTES } from '../../constants/routes';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { IUserInfo, setId, setLogin } from '../../store/slices/user/userSlice';
import { authUser, getUsers } from '../../store/slices/user/userThunks';

interface IFormInput {
  login: string;
  password: string;
}

const getUserId = (users: IUserInfo[], login: string) => {
  return users.find((user) => user.login === login)?._id;
};

export const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  const { users, login, isUserLogIn } = userState;

  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
    dispatch(setLogin(data.login));
    dispatch(authUser(data));
    reset();
  };

  useEffect(() => {
    if (isUserLogIn) {
      dispatch(getUsers());
    }
  }, [dispatch, isUserLogIn]);

  useEffect(() => {
    if (isUserLogIn && users.length) {
      const id = getUserId(users, login) || '';
      dispatch(setId(id));
    }
  }, [dispatch, isUserLogIn, login, users]);
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
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="false">
        <Controller
          name="login"
          control={control}
          defaultValue=""
          rules={{
            required: 'Field is require',
            pattern: {
              value: /[a-zA-Z0-9]{2,10}$/,
              message: 'Wrong format',
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              type="text"
              label="Login"
              placeholder="login"
              startDecorator={<PersonRoundedIcon />}
            />
          )}
        />
        {errors.login && <Typography level="body2">{errors.login.message}</Typography>}
        <Controller
          name="password"
          defaultValue=""
          control={control}
          rules={{
            required: 'Field is require',
          }}
          render={({ field }) => (
            <TextField
              {...field}
              type="password"
              placeholder="password"
              label="Password"
              startDecorator={<KeyRoundedIcon />}
            />
          )}
        />
        {errors.password && <Typography level="body2">{errors.password.message}</Typography>}
        <Button type="submit" sx={{ mt: 1 }}>
          Log in
        </Button>
      </form>
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
