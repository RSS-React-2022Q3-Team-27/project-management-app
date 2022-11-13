import Box from '@mui/joy/Box';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { ROUTES } from '../../../constants/routes';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setHeaderLoggedWelcome, setHeaderMain, setHeaderNotLogged } from '../../../store/slices/header/headerSlice';
import { HeaderState } from '../../../types/HeaderState';
import { CreateNewBoard } from '../CreateBoardButton';
import { MainPageButton } from '../MainPageButton';
import { NavButton } from '../NavButton';
import { ProfileButton } from '../ProfileButton';
import { SignOutButton } from '../SignOutButton';

export const Nav = ({ placedInHeader }: { placedInHeader: boolean }) => {
  const { t } = useTranslation();
  const { header } = useAppSelector((state) => state.header);
  const { isUserLogIn } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const location = useLocation();
  let nav;

  useEffect(() => {
    if (!isUserLogIn) {
      dispatch(setHeaderNotLogged());
    } else if (location.pathname === ROUTES.WELCOME.path) {
      dispatch(setHeaderLoggedWelcome());
    } else {
      dispatch(setHeaderMain());
    }
  }, [dispatch, isUserLogIn, location.pathname]);

  const handleDisplay = () => {
    return placedInHeader ? { xs: 'none', sm: 'flex' } : 'flex';
  };

  switch (header) {
    case HeaderState.main:
      nav = (
        <>
          <CreateNewBoard />
          <ProfileButton />
          <SignOutButton />
        </>
      );
      break;
    case HeaderState.loggedWelcome:
      nav = <MainPageButton />;
      break;
    default:
      nav = (
        <>
          <NavButton route={ROUTES.SIGN_IN.path} variant={'outlined'} text={t('signIn')} />
          <NavButton route={ROUTES.SIGN_UP.path} variant={'solid'} text={t('signUp')} />
        </>
      );
  }

  return (
    <Box component="nav" sx={{ gap: 2, flexDirection: { xs: 'column', sm: 'row' }, display: handleDisplay() }}>
      {nav}
    </Box>
  );
};
