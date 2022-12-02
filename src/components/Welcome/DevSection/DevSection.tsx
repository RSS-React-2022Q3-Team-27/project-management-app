import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';
import { useTranslation } from 'react-i18next';

import { DEVELOPERS } from '../../../constants/DEVELOPERS';

export const DevSection = () => {
  const { t } = useTranslation();

  const cards = DEVELOPERS.map(({ link, name, image, contribution }) => (
    <Link key={name} href={link} target="_blank" rel="noreferrer" underline="none" sx={{ width: '100%' }}>
      <Card
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: 2,
          width: '100%',
          bgcolor: 'neutral.softBg',
        }}
      >
        <Box sx={{ display: 'flex', mx: 'auto', mb: 2 }}>
          <Box
            component="img"
            src={image}
            alt="Developer avatar"
            sx={{
              width: '100%',
              maxHeight: '160px',
              borderRadius: 200,
              bgcolor: 'background.surface',
            }}
          />
        </Box>
        <Typography level="h5" component="h3" textColor="text.secondary" sx={{ textAlign: 'center', fontWeight: 'md' }}>
          {t(name)}
        </Typography>
        <Divider role="presentation" sx={{ py: 2 }}>
          <Chip variant="outlined" color="neutral" size="sm">
            {t('mainContribution')}
          </Chip>
        </Divider>
        <List aria-labelledby="contribution-list" sx={{ mx: 'auto' }}>
          {contribution.map((item) => (
            <ListItem key={item}>
              <Typography textColor="text.secondary">{t(item)}</Typography>
            </ListItem>
          ))}
        </List>
      </Card>
    </Link>
  ));

  return (
    <>
      <Typography
        level="h5"
        component="h2"
        sx={{ position: 'relative', left: -16, bgcolor: 'background.surface', py: 2 }}
      >
        {t('ourTeam')}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'center',
          gap: 2,
          px: 2,
          py: 4,
          mx: 'auto',
        }}
      >
        {cards}
      </Box>
    </>
  );
};
