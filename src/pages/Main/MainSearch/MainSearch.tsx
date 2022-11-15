import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/joy/Box';
import TextField from '@mui/joy/TextField';
import { useTranslation } from 'react-i18next';

export const MainSearch = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ maxWidth: 350, minWidth: 280 }}>
      <TextField type="text" placeholder={t('search')} variant="outlined" startDecorator={<SearchIcon />} />
    </Box>
  );
};
