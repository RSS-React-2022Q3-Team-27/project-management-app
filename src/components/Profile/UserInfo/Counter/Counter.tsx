import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { Box, Chip, Typography } from '@mui/joy';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getTimeBeforeExit } from '../../../../utils/getTimeBeforeExit';

const msToTime = (duration: number) => {
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  const h = hours < 10 ? '0' + hours : hours;
  const m = minutes < 10 ? '0' + minutes : minutes;
  const s = seconds < 10 ? '0' + seconds : seconds;

  return h + ':' + m + ':' + s;
};

export const Counter = () => {
  const { t } = useTranslation();
  const [counter, setCounter] = useState(getTimeBeforeExit() as number);
  useEffect(() => {
    const timer = setTimeout(() => {
      setCounter((prev) => prev - 1000);
    }, 1000);
    return () => clearTimeout(timer);
  }, [counter]);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
      <Chip variant="outlined" color="neutral" size="lg" startDecorator={<AccessTimeFilledIcon color="primary" />}>
        <Typography level="body2">{t('youWillLogOutAfter')}:</Typography>
        <Typography level="body2" color={counter < 1800 ? 'danger' : 'primary'} sx={{ paddingLeft: 1 }}>
          {msToTime(counter)}
        </Typography>
      </Chip>
    </Box>
  );
};
