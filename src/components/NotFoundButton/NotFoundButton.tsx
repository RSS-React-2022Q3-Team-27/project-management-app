import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import { ROUTES } from '../../constants/routes';
import { useAppSelector } from '../../store/hooks';

export const NotFoundButton = () => {
  const { isUserLogIn } = useAppSelector((state) => state.user);
  const { t } = useTranslation();
  const [route, setRoute] = useState(ROUTES.WELCOME.path);
  const [text, setText] = useState(t('toWelcomePage'));

  useEffect(() => {
    if (isUserLogIn) {
      setRoute(ROUTES.MAIN.path);
      setText(t('toMainPage'));
    }
  }, [isUserLogIn, t]);

  return (
    <Link component={RouterLink} to={route} underline={'none'}>
      <Button>{text}</Button>
    </Link>
  );
};
