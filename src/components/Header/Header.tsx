import Box, { BoxProps } from '@mui/joy/Box';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { cloneElement, ReactElement } from 'react';

import { useAppSelector } from '../../store/hooks';

import { AppLogo } from '../Header/AppLogo';
import { Customization } from '../Header/Customization';
import { MenuButton } from '../Header/MenuButton';
import { Nav } from '../Header/Nav';

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
    boxShadow: trigger ? 'sm' : 'none',
  });
}

export const Header = (props: BoxProps) => {
  const { sideDrawer } = useAppSelector((state) => state.header);

  return (
    <ElevationScroll {...props}>
      <Box
        component="header"
        className="Header"
        {...props}
        sx={[
          {
            gap: 2,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gridColumn: '1 / -1',
            p: 2,
            position: 'sticky',
            top: 0,
            zIndex: 1100,
            bgcolor: 'background.surface',
            transitionDuration: '0.3s',
          },
          ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
        ]}
      >
        <AppLogo />
        <Customization />
        <MenuButton />
        {!sideDrawer && <Nav placedInHeader={true} />}
      </Box>
    </ElevationScroll>
  );
};
