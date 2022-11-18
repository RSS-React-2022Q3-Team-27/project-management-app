import { Box, Divider, Sheet, Typography } from '@mui/joy';
import { nanoid } from '@reduxjs/toolkit';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { ProfileTask } from './ProfileTask/ProfileTask';
import style from './UserTasks.module.css';

import { useAppSelector } from '../../../store/hooks';
import { useGetTasksByUserIdQuery } from '../../../store/slices/tasks/tasksApi';

export const UserTasks = () => {
  const { t } = useTranslation();
  const { id } = useAppSelector((state) => state.user);
  const { data } = useGetTasksByUserIdQuery(id);

  return (
    <Sheet
      sx={{
        maxWidth: 1200,
        width: '100vw',
        overflow: 'auto',
        mx: 'auto',
        my: 4,
        py: 3,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 'sm',
        boxShadow: 'md',
      }}
      variant="outlined"
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', margin: 2 }}>
        <Typography level="h2">{t('yourTasks')}</Typography>
      </Box>
      <Divider />
      <Box
        className={style.list}
        sx={{
          width: '100%',
          overflow: 'auto',
          mx: 'auto',
          px: 2,
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
          borderRadius: 'sm',
          minHeight: '100px',
        }}
      >
        {!data?.length && (
          <Typography sx={{ py: 6, margin: '0 auto' }} level="body1">
            {t('yourHaventtGotTasks')}
          </Typography>
        )}
        {data?.map((task) => (
          <ProfileTask task={task} key={nanoid()} />
        ))}
      </Box>
    </Sheet>
  );
};
