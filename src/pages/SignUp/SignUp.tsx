import AccessibilityNewRoundedIcon from '@mui/icons-material/AccessibilityNewRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Button from '@mui/joy/Button';

import Sheet from '@mui/joy/Sheet';
import TextField from '@mui/joy/TextField';
import Typography from '@mui/joy/Typography';
import React, { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { ROUTES } from '../../constants/routes';

import { useAppDispatch } from '../../store/hooks';
import { registerUser } from '../../store/slices/user/userThunks';

interface IFormInput {
  name: string;
  login: string;
  password: string;
}

export const SignUp = () => {
  const [userInfo, setUserInfo] = useState<IFormInput | null>(null);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({
    mode: 'onChange',
  });

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
    setUserInfo(data);
    reset();
  };

  useEffect(() => {
    if (userInfo) {
      dispatch(registerUser(userInfo));
      navigate(`/${ROUTES.SIGN_IN.path}`);
    }
  }, [dispatch, navigate, userInfo]);
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
        <Typography level="body2">Registration</Typography>
      </div>
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
              startDecorator={<AccessibilityNewRoundedIcon />}
            />
          )}
        />
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
          Registration
        </Button>
      </form>
      <Typography
        endDecorator={<Link to={`/${ROUTES.SIGN_IN.path}`}>Sign in</Link>}
        fontSize="sm"
        sx={{ alignSelf: 'center' }}
      >
        Already have an account?
      </Typography>
    </Sheet>
  );
};
