import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Tooltip from '@mui/joy/Tooltip';
import { Link } from 'react-router-dom';

import { useAppDispatch } from '../../../store/hooks';
import { closeSideDrawer } from '../../../store/slices/header/headerSlice';

type NavButtonType = {
  route: string;
  text?: string;
  variant: 'plain' | 'outlined' | 'soft' | 'solid';
  isHeader: boolean;
  color?: 'primary' | 'neutral' | 'danger' | 'info' | 'success' | 'warning';
  children?: React.ReactNode;
};

export const NavButton = ({ route, text, variant, isHeader, color, children }: NavButtonType) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (!isHeader) {
      dispatch(closeSideDrawer());
    }
  };

  return !isHeader || !children ? (
    <Button
      component={Link}
      to={route}
      variant={variant}
      sx={{ width: isHeader ? '120px' : '100%', textAlign: 'center' }}
      onClick={handleClick}
      color={color ? color : 'primary'}
    >
      {text}
    </Button>
  ) : (
    <Tooltip title={text} color="primary" size="sm" variant="plain" arrow>
      <IconButton component={Link} to={route} onClick={handleClick} color="neutral" variant="outlined">
        {children}
      </IconButton>
    </Tooltip>
  );
};
