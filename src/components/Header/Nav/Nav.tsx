import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import Box from '@mui/joy/Box';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { ROUTES } from '../../../constants/routes';
import { useAppSelector } from '../../../store/hooks';
import { HeaderState } from '../../../types/HeaderState';
import { CreateNewBoard } from '../CreateBoardButton';
import { NavButton } from '../NavButton';
import { SignOutButton } from '../SignOutButton';

export const Nav = ({ placedInHeader }: { placedInHeader: boolean }) => {
  const { t } = useTranslation();
  const { isUserLogIn } = useAppSelector((state) => state.user);
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = useState(HeaderState.main);
  let nav;

  useEffect(() => {
    if (!isUserLogIn) {
      setCurrentLocation(HeaderState.notLogged);
    } else if (location.pathname === ROUTES.PROFILE.path) {
      setCurrentLocation(HeaderState.profile);
    } else if (location.pathname === ROUTES.WELCOME.path || location.pathname === ROUTES.ROOT.path) {
      setCurrentLocation(HeaderState.loggedWelcome);
    } else {
      setCurrentLocation(HeaderState.main);
    }
  }, [isUserLogIn, location.pathname]);

  const handleDisplay = () => {
    return placedInHeader ? { xs: 'none', sm: 'flex' } : 'flex';
  };

  switch (currentLocation) {
    case HeaderState.main:
      nav = (
        <>
          <CreateNewBoard />
          <NavButton route={ROUTES.PROFILE.path} variant={'solid'} text={t('profile')} isHeader={placedInHeader}>
            <PersonOutlineRoundedIcon />
          </NavButton>
          <SignOutButton isHeader={placedInHeader} />
        </>
      );
      break;
    case HeaderState.profile:
      nav = (
        <>
          <CreateNewBoard />
          <NavButton route={ROUTES.MAIN.path} variant={'solid'} text={t('toMainPage')} isHeader={placedInHeader}>
            <HomeRoundedIcon />
          </NavButton>
          <SignOutButton isHeader={placedInHeader} />
        </>
      );
      break;
    case HeaderState.loggedWelcome:
      nav = <NavButton route={ROUTES.MAIN.path} variant={'plain'} text={t('toMainPage')} isHeader={placedInHeader} />;
      break;
    default:
      nav = (
        <>
          <NavButton route={ROUTES.SIGN_IN.path} variant={'outlined'} text={t('signIn')} isHeader={placedInHeader} />
          <NavButton route={ROUTES.SIGN_UP.path} variant={'solid'} text={t('signUp')} isHeader={placedInHeader} />
        </>
      );
  }

  return (
    <Box component="nav" sx={{ gap: 2, flexDirection: { xs: 'column', sm: 'row' }, display: handleDisplay() }}>
      {nav}
    </Box>
  );
};
