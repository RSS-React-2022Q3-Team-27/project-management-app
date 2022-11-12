import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/joy';

import { useAppDispatch } from '../../../store/hooks';
import { openSideDrawer } from '../../../store/slices/header/headerSlice';

export const MenuButton = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(openSideDrawer());
  };

  return (
    <IconButton variant="outlined" size="md" onClick={handleClick} sx={{ display: { sm: 'none' } }}>
      <MenuIcon />
    </IconButton>
  );
};
