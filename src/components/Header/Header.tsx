import Box, { BoxProps } from '@mui/joy/Box';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { cloneElement, ReactElement, useEffect, useState } from 'react';

import { useAppSelector } from '../../store/hooks';

import { AppLogo } from '../Header/AppLogo';
import { Customization } from '../Header/Customization';
import { MenuButton } from '../Header/MenuButton';
import { Nav } from '../Header/Nav';
import { SideDrawer } from '../SideDrawer';

interface Props {
  children: ReactElement;
}

function ElevationScroll(props: Props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return cloneElement(children, {
    boxShadow: trigger ? 'md' : 'none',
    paddingY: trigger ? 1 : 2,
  });
}

export const Header = (props: BoxProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { sideDrawer } = useAppSelector((state) => state.header);

  useEffect(() => {
    setDrawerOpen(sideDrawer);
  }, [sideDrawer]);

  return (
    <ElevationScroll {...props}>
      <Box
        component="header"
        className="Header"
        {...props}
        sx={[
          {
            paddingX: 2,
            gap: 2,
            bgcolor: 'background.paper',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gridColumn: '1 / -1',
            position: 'sticky',
            top: 0,
            zIndex: 1100,
            transition: '0.5s',
          },
          ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
        ]}
      >
        <AppLogo />
        <Customization />
        <MenuButton />
        {drawerOpen ? <SideDrawer /> : <Nav placedInHeader={true} />}
      </Box>
    </ElevationScroll>
  );
};
