import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import { useTranslation } from 'react-i18next';

import image from '../../assets/images/not-found.svg';
import { NotFoundButton } from '../../components/NotFoundButton';

export const NotFound = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        px: 2,
        py: 6,
        my: 8,
        mx: 'auto',
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <Box component="img" src={image} alt="Not found page" sx={{ width: '100%', maxHeight: 400 }} />
      </Box>
      <Typography component="h2" level="h4">
        {t('pageNotFound')}
      </Typography>
      <NotFoundButton />
    </Box>
  );
};
