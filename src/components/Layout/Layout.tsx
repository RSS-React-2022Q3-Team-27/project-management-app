import Box from '@mui/joy/Box';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { useAppSelector } from '../../store/hooks';
import { Footer } from '../Footer';

import { Header } from '../Header';
import { AppLogo } from '../Header/AppLogo';
import { Customization } from '../Header/Customization';
import { MenuButton } from '../Header/MenuButton';
import { Nav } from '../Header/Nav';
import { SideDrawer } from '../SideDrawer';

export const Layout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { sideDrawer } = useAppSelector((state) => state.header);

  useEffect(() => {
    setDrawerOpen(sideDrawer);
  }, [sideDrawer]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      {drawerOpen && <SideDrawer />}
      <Header>
        <AppLogo />
        <Customization />
        <MenuButton />
        {!drawerOpen && <Nav placedInHeader={true} />}
      </Header>
      <Outlet />
      <Footer />
    </Box>
  );
};
