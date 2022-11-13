import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';

import { SignUpForm } from '../../components/SignUpForm/SignUpForm';

import { ROUTES } from '../../constants/routes';

export const SignUp = () => {
  const { t } = useTranslation();

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
          <b>{t('welcome')}</b>
        </Typography>
        <Typography level="body2">{t('signUp')}</Typography>
      </div>
      <SignUpForm />
      <Typography
        endDecorator={<Link to={`${ROUTES.SIGN_IN.path}`}>{t('signIn')}</Link>}
        fontSize="sm"
        sx={{ alignSelf: 'center' }}
      >
        {t('alreadyHaveAnAccount')}
      </Typography>
    </Sheet>
  );
};
