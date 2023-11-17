import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import IconButton from '@mui/joy/IconButton';

import { useAppDispatch } from '../../../store/hooks';
import { closeSideDrawer } from '../../../store/slices/header/headerSlice';

export const CloseDrawerButton = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(closeSideDrawer());
  };

  return (
    <IconButton color="neutral" size="sm" sx={{ width: '32px' }} onClick={handleClick}>
      <ArrowBackRoundedIcon />
    </IconButton>
  );
};
