import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { useTranslation } from 'react-i18next';

import { APP_ADVANTAGES } from '../../../constants/APP_ADVANTAGES';

export const AdvantageSection = () => {
  const { t } = useTranslation();

  const cards = APP_ADVANTAGES.map(({ content, image, id }) => (
    <Sheet
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 40,
        width: '100%',
        p: 2,
      }}
      key={id}
    >
      <Typography level="h5" component="h3" sx={{ textAlign: 'center', fontWeight: 'sm' }}>
        {t(content)}
      </Typography>
      <Box
        component="img"
        src={image}
        alt="Promo advantage"
        sx={{
          width: '100%',
          maxHeight: '180px',
        }}
      />
    </Sheet>
  ));

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' },
        justifyContent: 'space-between',
        gap: 2,
      }}
    >
      {cards}
    </Box>
  );
};
