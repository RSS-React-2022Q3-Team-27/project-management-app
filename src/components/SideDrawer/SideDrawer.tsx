import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';

import { useAppDispatch } from '../../store/hooks';
import { closeSideDrawer } from '../../store/slices/header/headerSlice';

import { Nav } from '../Header/Nav';

const drawerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  minWidth: 256,
  width: 'max-content',
  height: '100%',
  position: 'absolute',
  right: 0,
  p: 2,
  boxShadow: 'lg',
  bgcolor: 'background.componentBg',
};

export const SideDrawer = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(closeSideDrawer());
  };

  return (
    <Box sx={[{ position: 'fixed', zIndex: 1200, width: '100%', height: '100%' }]}>
      <Box
        role="button"
        onClick={handleClick}
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: (theme) => `rgba(${theme.vars.palette.neutral.darkChannel} / 0.8)`,
        }}
      />
      <Sheet sx={drawerStyle}>
        <Nav placedInHeader={false} />
      </Sheet>
    </Box>
  );
};
