import { Box, Sheet, Typography } from '@mui/joy';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { ProfileTask } from './ProfileTask/ProfileTask';

import { useAppSelector } from '../../../store/hooks';
import { useGetTasksByUserIdQuery } from '../../../store/slices/tasks/tasksApi';

export const UserTasks = () => {
  const { t } = useTranslation();
  const { id } = useAppSelector((state) => state.user);
  const { data } = useGetTasksByUserIdQuery(id);

  const queryBoards = [...new Set(data?.map((task) => task.boardId))];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
      <Typography level="h2">{t('yourTasks')}</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
        {data?.length
          ? queryBoards.map((board, i) => (
              <Sheet
                key={board}
                sx={{
                  width: 300,
                  my: 4,
                  py: 3,
                  px: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                  borderRadius: 'sm',
                  boxShadow: 'md',
                }}
                variant="outlined"
              >
                <Typography level="h4">{`${t('board')} ${i + 1}`}</Typography>
                {data
                  .filter((task) => task.boardId === board)
                  .map((task) => (
                    <ProfileTask task={task} key={task._id} />
                  ))}
              </Sheet>
            ))
          : t('yourHaventtGotTasks')}
      </Box>
    </Box>
  );
};
