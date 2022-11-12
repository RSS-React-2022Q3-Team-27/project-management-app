import AccessibilityNewRoundedIcon from '@mui/icons-material/AccessibilityNewRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Button from '@mui/joy/Button';

import TextField from '@mui/joy/TextField';
import Typography from '@mui/joy/Typography';
import { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ROUTES } from '../../constants/routes';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { authUser, registerUser } from '../../store/slices/user/userThunks';

interface IFormInput {
  name: string;
  login: string;
  password: string;
}

export const SignUpForm = () => {
  const [password, setPassword] = useState('');
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({
    mode: 'onChange',
  });

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  const { login, isUserLogIn } = userState;

  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
    dispatch(registerUser(data));
    setPassword(data.password);
  };

  useEffect(() => {
    if (login) {
      dispatch(authUser({ login, password }));
    }
  }, [dispatch, login, password]);

  useEffect(() => {
    if (isUserLogIn) {
      reset();
      toast.success(`You've successfully signed in`);
      navigate(ROUTES.MAIN.path);
    }
  }, [isUserLogIn, navigate, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="false">
      <Controller
        name="name"
        control={control}
        defaultValue=""
        rules={{
          required: 'Field is require',
          pattern: {
            value: /[a-zA-Zа-яА-Я]{2,10}$/,
            message: 'Wrong format',
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            type="text"
            label="Name"
            placeholder="name"
            autoComplete="off"
            startDecorator={<AccessibilityNewRoundedIcon />}
          />
        )}
      />
      {errors.name && (
        <Typography level="body2" color="danger">
          {errors.name.message}
        </Typography>
      )}

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
            autoComplete="off"
            placeholder="login"
            startDecorator={<PersonRoundedIcon />}
          />
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
            autoComplete="off"
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
        Registration
      </Button>
    </form>
  );
};
