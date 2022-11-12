import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import { ROUTES } from '../../../constants/routes';
import { useAppDispatch } from '../../../store/hooks';
import { closeSideDrawer } from '../../../store/slices/header/headerSlice';

export const SignInButton = ({ placedInHeader }: { placedInHeader: boolean }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleVisibility = () => {
    if (placedInHeader) {
      return { xs: 'none', sm: 'inline-flex' };
    }

    return 'inline-flex';
  };

  const handleClick = () => {
    dispatch(closeSideDrawer());
  };

  return (
    <Link
      component={RouterLink}
      to={ROUTES.SIGN_IN.path}
      underline={'none'}
      sx={{ display: handleVisibility() }}
      onClick={handleClick}
    >
      <Button variant="outlined" sx={{ width: '100%' }}>
        {t('signIn')}
      </Button>
    </Link>
  );
};
