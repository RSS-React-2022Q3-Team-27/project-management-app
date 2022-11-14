import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { useTranslation } from 'react-i18next';

import promo from '../../../assets/images/promo.svg';

export const PromoSection = () => {
  const { t } = useTranslation();

  return (
    <Sheet
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column-reverse', sm: 'column-reverse', md: 'row' },
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        p: 2,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { sm: 'center', md: 'flex-start' }, gap: 2 }}>
        <Typography
          component="h1"
          level="display2"
          sx={{
            textAlign: { xs: 'center', sm: 'center', md: 'left' },
            mb: 2,
            fontSize: { sm: 60, xs: 32 },
          }}
        >
          {t('promoTitle1')}{' '}
          <Typography color="primary" sx={{ p: 0 }}>
            {t('promoTitle2')}{' '}
          </Typography>
          {t('promoTitle3')}
        </Typography>
        <Typography
          component="h2"
          sx={{
            fontWeight: 'sm',
            maxWidth: '500px',
            textAlign: { xs: 'center', sm: 'center', md: 'left' },
            mb: 2,
            fontSize: { sm: 24, xs: 18 },
          }}
        >
          {t('promo')}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Box
          component="img"
          src={promo}
          alt="Astronaut promo image"
          sx={{
            width: '100%',
            maxHeight: '500px',
          }}
        />
      </Box>
    </Sheet>
  );
};