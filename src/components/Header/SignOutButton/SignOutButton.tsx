import Button from '@mui/joy/Button';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '../../../store/hooks';
import { setHeaderNotLogged } from '../../../store/slices/header/headerSlice';
import { userLogOut } from '../../../store/slices/user/userSlice';

export const SignOutButton = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(userLogOut());
    dispatch(setHeaderNotLogged());
  };

  return <Button onClick={handleClick}>{t('signOut')}</Button>;
};
