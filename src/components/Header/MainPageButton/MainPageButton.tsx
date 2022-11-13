import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import { ROUTES } from '../../../constants/routes';

import { useAppDispatch } from '../../../store/hooks';
import { setHeaderMain } from '../../../store/slices/header/headerSlice';

export const MainPageButton = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setHeaderMain());
  };

  return (
    <Link component={RouterLink} to={ROUTES.MAIN.path} underline={'none'} onClick={handleClick}>
      <Button variant={'plain'} sx={{ width: '100%' }}>
        {t('goToMainPage')}
      </Button>
    </Link>
  );
};
