import GitHubIcon from '@mui/icons-material/GitHub';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';

import logoLight from '../../assets/images/rss-logo-light.svg';
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
      startDecorator={<GitHubIcon sx={{ display: { xs: 'none', sm: 'block' } }} />}
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
        gap: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 'auto',
        paddingX: { xs: 1, sm: 2 },
        paddingY: 2,
        bgcolor: 'background.paper',
      }}
    >
      <Link href={SCHOOL_LINK} target="_blank" rel="noreferrer">
        <Box
          component="img"
          sx={{
            height: 38,
            width: 102,
          }}
          alt="RSS Logo"
          src={logoLight}
        />
      </Link>
      <Typography>2022</Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: { xs: 1, sm: 2 },
        }}
      >
        {links}
      </Box>
    </Box>
  );
};
