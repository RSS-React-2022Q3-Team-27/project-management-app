import Button from '@mui/joy/Button';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { ROUTES } from '../../../constants/routes';
import { useAppSelector } from '../../../store/hooks';

export const PromoButton = () => {
  const { t } = useTranslation();
  const { isUserLogIn } = useAppSelector((state) => state.user);
  const [route, setRoute] = useState(ROUTES.SIGN_UP.path);

  useEffect(() => {
    if (isUserLogIn) {
      setRoute(ROUTES.MAIN.path);
    } else {
      setRoute(ROUTES.SIGN_UP.path);
    }
  }, [isUserLogIn]);

  return (
    <Button component={Link} to={route} size="lg" sx={{ width: 180 }}>
      {t('getStarted')}
    </Button>
  );
};
