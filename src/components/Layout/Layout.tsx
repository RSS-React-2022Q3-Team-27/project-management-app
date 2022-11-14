import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import { Outlet } from 'react-router-dom';

import { Footer } from '../Footer';

import { Header } from '../Header';
import { SideDrawer } from '../SideDrawer';

export const Layout = () => {
  return (
    <Sheet
      sx={{
        display: 'grid',
        gridTemplateRows: 'min-content 1fr min-content',
        minHeight: '100vh',
      }}
      variant="soft"
    >
      <SideDrawer />
      <Header />
      <Box component="main">
        <Outlet />
      </Box>
      <Footer />
    </Sheet>
  );
};
