import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import IconButton from '@mui/joy/IconButton';

import { useAppDispatch } from '../../../store/hooks';
import { closeSideDrawer } from '../../../store/slices/header/headerSlice';

export const CloseDrawerButton = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(closeSideDrawer());
  };

  return (
    <IconButton size="sm" sx={{ width: '32px' }} onClick={handleClick}>
      <CloseRoundedIcon />
    </IconButton>
  );
};
