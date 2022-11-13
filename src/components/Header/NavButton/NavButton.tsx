import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { Link as RouterLink } from 'react-router-dom';

import { useAppDispatch } from '../../../store/hooks';
import { closeSideDrawer } from '../../../store/slices/header/headerSlice';

type NavButtonType = {
  route: string;
  text: string;
  variant: 'plain' | 'outlined' | 'soft' | 'solid';
};

export const NavButton = ({ route, text, variant }: NavButtonType) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(closeSideDrawer());
  };

  return (
    <Link component={RouterLink} to={route} underline={'none'} onClick={handleClick}>
      <Button variant={variant} sx={{ width: '100%' }}>
        {text}
      </Button>
    </Link>
  );
};
