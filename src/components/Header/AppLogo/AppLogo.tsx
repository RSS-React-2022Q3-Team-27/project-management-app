import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import { Link as RouterLink } from 'react-router-dom';

import logo from '../../../assets/images/app_logo.svg';
import { ROUTES } from '../../../constants/routes';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setHeaderLoggedWelcome, setHeaderNotLogged } from '../../../store/slices/header/headerSlice';

export const AppLogo = () => {
  const dispatch = useAppDispatch();
  const { isUserLogIn } = useAppSelector((state) => state.user);

  const handleClick = () => {
    if (isUserLogIn) {
      dispatch(setHeaderLoggedWelcome());
    } else {
      dispatch(setHeaderNotLogged());
    }
  };

  return (
    <Link component={RouterLink} to={ROUTES.WELCOME.path} onClick={handleClick}>
      <Box
        component="img"
        sx={{
          height: 40,
          width: 40,
        }}
        alt="App Logo"
        src={logo}
      />
    </Link>
  );
};
