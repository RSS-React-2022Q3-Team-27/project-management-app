import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Button from '@mui/joy/Button';

import TextField from '@mui/joy/TextField';
import Typography from '@mui/joy/Typography';
import React, { useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

import { showLogInError } from './showLogInError';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setId } from '../../store/slices/user/userSlice';
import { authUser } from '../../store/slices/user/userThunks';
import { IUserInfo } from '../../store/slices/users/usersSlice';
import { getUsers } from '../../store/slices/users/usersThunks';

interface IFormInput {
  login: string;
  password: string;
}

const getUserId = (users: IUserInfo[], login: string) => {
  return users.find((user) => user.login === login)?._id;
};

export const SignInForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({
    mode: 'onChange',
  });

  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  const { login, isUserLogIn, logInErrorCode } = userState;
  const users = useAppSelector((state) => state.users.users);

  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
    dispatch(authUser(data));
    reset();
  };

  useEffect(() => {
    if (logInErrorCode) {
      showLogInError(logInErrorCode);
    }
  }, [logInErrorCode]);

  useEffect(() => {
    if (isUserLogIn) {
      dispatch(getUsers());
    }
  }, [dispatch, isUserLogIn]);

  useEffect(() => {
    if (isUserLogIn && users.length) {
      toast.success(`You've successfully signed in`);
      const id = getUserId(users, login) || '';
      dispatch(setId(id));
    }
  }, [dispatch, isUserLogIn, login, users]);
  return (
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
          <TextField {...field} type="text" label="Login" placeholder="login" startDecorator={<PersonRoundedIcon />} />
        )}
      />
      {errors.login && (
        <Typography level="body2" color="danger">
          {errors.login.message}
        </Typography>
      )}

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
      {errors.password && (
        <Typography level="body2" color="danger">
          {errors.password.message}
        </Typography>
      )}

      <Button type="submit" sx={{ mt: 1 }}>
        Log in
      </Button>
    </form>
  );
};
