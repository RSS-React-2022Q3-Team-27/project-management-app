import { Outlet } from 'react-router-dom';

import { Header } from '../Header';
import { SideDrawer } from '../SideDrawer';

export const Layout = () => {
  return (
    <>
      <SideDrawer />
      <Header />
      <Outlet />
    </>
  );
};
