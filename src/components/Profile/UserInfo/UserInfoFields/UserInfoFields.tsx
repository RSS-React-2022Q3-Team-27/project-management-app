import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
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
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            px: 2,
            py: 1,
            borderRadius: 'sm',
            bgcolor: 'background.level1',
          }}
        >
          <Typography
            level="h6"
            sx={{
              width: '60px',
              color: 'text.secondary',
              textTransform: 'uppercase',
              letterSpacing: 'lg',
              fontWeight: 'lg',
              fontSize: 'xs',
            }}
          >
            {t('name')}
          </Typography>
          <Divider orientation="vertical" sx={{ mr: 'auto' }} />
          <Typography sx={{ fontSize: 'lg', mr: 'auto' }}>{userName}</Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            px: 2,
            py: 1,
            borderRadius: 'sm',
            bgcolor: 'background.level1',
          }}
        >
          <Typography
            level="h6"
            sx={{
              width: '60px',
              color: 'text.secondary',
              textTransform: 'uppercase',
              letterSpacing: 'lg',
              fontWeight: 'lg',
              fontSize: 'xs',
            }}
          >
            {t('login')}
          </Typography>
          <Divider orientation="vertical" sx={{ mr: 'auto' }} />
          <Typography sx={{ fontSize: 'lg', mr: 'auto' }}>{login}</Typography>
        </Box>
      </Box>
    </>
  );
};
