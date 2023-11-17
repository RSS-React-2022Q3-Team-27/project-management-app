import GitHubIcon from '@mui/icons-material/GitHub';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';

import { FooterLogo } from './FooterLogo';

import { DEVELOPERS, SCHOOL_LINK } from '../../constants/DEVELOPERS';

export const Footer = () => {
  const links = DEVELOPERS.map((dev) => (
    <Link
      href={dev.link}
      target="_blank"
      rel="noreferrer"
      key={dev.nickname}
      underline="none"
      variant="plain"
      color="neutral"
      startDecorator={<GitHubIcon color="primary" sx={{ display: { xs: 'none', sm: 'block' } }} />}
      sx={{ fontSize: { xs: 12, sm: 'inherit' } }}
    >
      {dev.nickname}
    </Link>
  ));

  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 0.5, sm: 2 },
        alignItems: 'center',
        justifyContent: 'space-between',
        p: { xs: 1, sm: 2 },
        bgcolor: 'background.surface',
      }}
    >
      <Link
        href={SCHOOL_LINK}
        target="_blank"
        rel="noreferrer"
        id="rs-school-link"
        sx={{ display: { xs: 'none', sm: 'block', height: 24 } }}
      >
        <FooterLogo />
      </Link>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: { xs: 1, sm: 2 },
        }}
      >
        {links}
      </Box>
      <Typography sx={{ width: { md: 'auto', lg: 65 }, textAlign: 'right', fontSize: { xs: 12, sm: 'inherit' } }}>
        2022
      </Typography>
    </Box>
  );
};
