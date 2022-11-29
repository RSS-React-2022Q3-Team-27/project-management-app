import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import { useTranslation } from 'react-i18next';

import { DEVELOPERS } from '../../../constants/DEVELOPERS';

export const DevSection = () => {
  const { t } = useTranslation();

  const cards = DEVELOPERS.map(({ link, name, image }) => (
    <Link key={name} href={link} target="_blank" rel="noreferrer" underline="none" sx={{ width: '100%' }}>
      <Card
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          borderRadius: 40,
          p: 4,
          width: '100%',
        }}
      >
        <Box
          component="img"
          src={image}
          alt="Developer avatar"
          sx={{
            width: '100%',
            maxHeight: '150px',
          }}
        />
        <Typography level="h5" component="h3" sx={{ textAlign: 'center', fontWeight: 'sm' }}>
          {t(name)}
        </Typography>
      </Card>
    </Link>
  ));

  return (
    <>
      <Typography
        level="h2"
        component="h3"
        sx={{
          fontWeight: 'sm',
          textAlign: 'center',
        }}
      >
        {t('developers')}
      </Typography>
      <Box
        sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', gap: 2 }}
      >
        {cards}
      </Box>
    </>
  );
};
