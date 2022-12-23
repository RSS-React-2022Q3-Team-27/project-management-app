import Sheet from '@mui/joy/Sheet';

import Drawer from '@mui/material/Drawer';

import { useEffect, useState } from 'react';

import { CloseDrawerButton } from './CloseDrawerButton';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { closeSideDrawer } from '../../store/slices/header/headerSlice';

import { Nav } from '../Header/Nav';

const drawerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  minWidth: 256,
  width: 'max-content',
  height: '100%',
  p: 2,
  boxShadow: 'lg',
  bgcolor: 'background.componentBg',
};

export const SideDrawer = () => {
  const { sideDrawer } = useAppSelector((state) => state.header);
  const dispatch = useAppDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    setOpenDrawer(sideDrawer);
  }, [sideDrawer]);

  const handleClick = () => {
    dispatch(closeSideDrawer());
    setOpenDrawer(false);
  };

  return (
    <Drawer anchor="right" open={openDrawer} onClose={handleClick}>
      <Sheet sx={drawerStyle}>
        <CloseDrawerButton />
        <Nav placedInHeader={false} />
      </Sheet>
    </Drawer>
  );
};
