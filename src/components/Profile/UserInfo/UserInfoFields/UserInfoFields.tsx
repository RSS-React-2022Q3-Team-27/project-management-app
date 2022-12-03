import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../../../../store/hooks';

export const UserInfoFields = () => {
  const { login, userName } = useAppSelector((state) => state.user);
  const { t } = useTranslation();
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          justifyContent: 'space-between',
          width: '100%',
          justifySelf: 'center',
          height: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            px: 2,
            py: 1,
            borderRadius: 'sm',
            bgcolor: 'neutral.softBg',
          }}
        >
          <Typography level="h6" sx={{ width: '70px', fontSize: 'sm', color: 'text.secondary' }}>
            {t('login')}
          </Typography>
          <Typography sx={{ fontSize: 'lg' }}>{login}</Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            px: 2,
            py: 1,
            borderRadius: 'sm',
            bgcolor: 'neutral.softBg',
          }}
        >
          <Typography level="h6" sx={{ width: '70px', fontSize: 'sm', color: 'text.secondary' }}>
            {t('name')}
          </Typography>
          <Typography sx={{ fontSize: 'lg' }}>{userName}</Typography>
        </Box>
      </Box>
    </>
  );
};
