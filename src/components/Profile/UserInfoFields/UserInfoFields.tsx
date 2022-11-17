import AccessibilityNewRoundedIcon from '@mui/icons-material/AccessibilityNewRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { Box, Chip, Typography } from '@mui/joy';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../../../store/hooks';

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
          paddingTop: '30px',
          width: '100%',
          justifySelf: 'center',
          height: '100%',
        }}
      >
        <Chip variant="outlined" color="neutral" size="lg" startDecorator={<PersonRoundedIcon />}>
          <Typography
            level="h6"
            sx={{
              width: '70px',
            }}
          >
            {t('login')}:
          </Typography>
          {login}
        </Chip>
        <Chip variant="outlined" color="neutral" size="lg" startDecorator={<AccessibilityNewRoundedIcon />}>
          <Typography
            level="h6"
            sx={{
              width: '70px',
            }}
          >
            {t('name')}:
          </Typography>
          {userName}
        </Chip>
      </Box>
    </>
  );
};
