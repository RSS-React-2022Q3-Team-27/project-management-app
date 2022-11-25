import { Box, Sheet, Typography } from '@mui/joy';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { ProfileTask } from './ProfileTask/ProfileTask';

import styles from './UserTasks.module.css';

import { useAppSelector } from '../../../store/hooks';
import { useGetBoardsByUserIdQuery } from '../../../store/slices/boards/boardsApi';
import { useGetTasksByUserIdQuery } from '../../../store/slices/tasks/tasksApi';

export const UserTasks = () => {
  const { t } = useTranslation();
  const { id } = useAppSelector((state) => state.user);
  const { data } = useGetTasksByUserIdQuery(id);
  const { data: userBoards } = useGetBoardsByUserIdQuery(id);

  const queryBoards = [...new Set(data?.map((task) => task.boardId))];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        my: 4,
        mx: 2,
      }}
    >
      <Typography level="h2" sx={{ my: 2 }}>
        {t('yourTasks')}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
        {data?.length
          ? queryBoards.map((board) => (
              <Sheet
                key={board}
                sx={{
                  width: 300,
                  height: 350,
                  overflow: 'auto',
                  py: 3,
                  px: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                  borderRadius: 'sm',
                  boxShadow: 'md',
                }}
                className={styles.list}
                variant="outlined"
              >
                <Typography level="h4">{userBoards?.find((el) => el._id === board)?.title}</Typography>
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
