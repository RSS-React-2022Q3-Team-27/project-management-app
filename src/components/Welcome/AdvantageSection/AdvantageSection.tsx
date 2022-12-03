import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { useTranslation } from 'react-i18next';

import { APP_ADVANTAGES } from '../../../constants/APP_ADVANTAGES';

export const AdvantageSection = () => {
  const { t } = useTranslation();

  const cards = APP_ADVANTAGES.map(({ content, image, id }, i) => (
    <Sheet
      sx={{
        display: 'flex',
        flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
        justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end',
        alignItems: 'center',
        borderRadius: 100,
        width: '100%',
        maxWidth: 400,
        p: 1,
        bgcolor: 'background.level1',
      }}
      key={id}
    >
      <Typography
        level="h5"
        component="h3"
        textColor="text.secondary"
        sx={{
          textAlign: i % 2 === 0 ? 'right' : 'left',
          fontWeight: 'sm',
          fontSize: { xs: '18px', sm: '18px', md: '20px' },
          mx: { xs: 1, sm: 1, md: 2 },
        }}
      >
        {t(content)}
      </Typography>
      <Sheet
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 100,
          outline: '2px dashed var(--joy-palette-divider)',
        }}
      >
        <Box
          component="img"
          src={image}
          alt="Promo advantage"
          sx={{
            width: '100px',
            maxHeight: '100px',
            m: { xs: 0, sm: '5px' },
          }}
        />
      </Sheet>
    </Sheet>
  ));

  return (
    <Box>
      <Box sx={{ height: 40 }}></Box>
      <Typography
        level="h5"
        component="h2"
        sx={{ position: 'relative', left: -16, bgcolor: 'background.surface', py: 2 }}
      >
        {t('features')}
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'auto', sm: 'auto auto' },
          justifyContent: 'center',
          gap: 2,
          py: 4,
          pl: 2,
          mx: 'auto',
        }}
      >
        {cards}
      </Box>
    </Box>
  );
};
