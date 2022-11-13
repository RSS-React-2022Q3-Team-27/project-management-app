import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import { ROUTES } from '../../../constants/routes';

export const ProfileButton = () => {
  const { t } = useTranslation();

  return (
    <Link component={RouterLink} to={ROUTES.PROFILE.path} underline={'none'}>
      <Button sx={{ width: '100%' }}>{t('profile')}</Button>
    </Link>
  );
};
