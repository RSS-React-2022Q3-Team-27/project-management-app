import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Tooltip from '@mui/joy/Tooltip';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { ROUTES } from '../../../constants/routes';

import { useAppDispatch } from '../../../store/hooks';
import { closeSideDrawer } from '../../../store/slices/header/headerSlice';
import { userLogOut } from '../../../store/slices/user/userSlice';
import { usersApi } from '../../../store/slices/users/usersApi';

export const SignOutButton = ({ isHeader }: { isHeader: boolean }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(userLogOut());
    dispatch(usersApi.util.resetApiState());
    if (!isHeader) {
      dispatch(closeSideDrawer());
    }
  };

  return isHeader ? (
    <Tooltip title={t('signOut')} color="primary" size="sm" variant="plain" arrow>
      <IconButton component={Link} to={ROUTES.WELCOME.path} onClick={handleClick} color="primary" variant="solid">
        <ExitToAppRoundedIcon />
      </IconButton>
    </Tooltip>
  ) : (
    <Button component={Link} to={ROUTES.WELCOME.path} onClick={handleClick} sx={{ width: isHeader ? '120px' : '100%' }}>
      {t('signOut')}
    </Button>
  );
};
