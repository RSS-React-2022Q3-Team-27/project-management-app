import { Avatar, Box } from '@mui/joy';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Link, useNavigate } from 'react-router-dom';

import styles from './SignUp.module.css';

import { SignUpForm } from '../../components/SignUpForm/SignUpForm';

import { ROUTES } from '../../constants/routes';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleAvatarModal } from '../../store/slices/user/userSlice';

export const SignUp = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { avatar, isUserLogIn } = useAppSelector((state) => state.user);

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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography level="h4" component="h1" lineHeight="31px">
          <b>{t('welcome')}</b>
        </Typography>

        <Avatar
          className={styles.avatar}
          alt="+"
          src={avatar}
          size="lg"
          sx={{ width: 70, height: 70, cursor: 'pointer' }}
          onClick={() => dispatch(toggleAvatarModal(true))}
        />
      </Box>
      <SignUpForm />
      <Typography
        endDecorator={
          <Link to={`${ROUTES.SIGN_IN.path}`} style={{ textDecoration: 'none' }}>
            {t('signIn')}
          </Link>
        }
        fontSize="sm"
        sx={{ alignSelf: 'center' }}
      >
        {t('alreadyHaveAnAccount')}
      </Typography>
    </Sheet>
  );
};
