import { Box, Sheet, Typography } from '@mui/joy';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './SearchResults.module.css';

import { ProfileTask } from '../../../components/Profile/UserTasks/ProfileTask/ProfileTask';

import { useAppSelector } from '../../../store/hooks';
import { useGetBoardsByUserIdQuery } from '../../../store/slices/boards/boardsApi';
import { TaskType } from '../../../store/slices/tasks/tasksApi';

export const SearchResults = () => {
  const { searchQueryResults } = useAppSelector((state) => state.tasks);
  const { id } = useAppSelector((state) => state.user);
  const { data } = useGetBoardsByUserIdQuery(id);
  const { t } = useTranslation();
  const [queryBoards, setQueryBoards] = useState<string[]>([]);

  useEffect(() => {
    if (searchQueryResults) {
      setQueryBoards([...new Set(searchQueryResults.filter((task) => task.userId === id).map((task) => task.boardId))]);
    }
  }, [id, searchQueryResults]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
      {searchQueryResults.length
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
              <Typography level="h4">{data?.find((el) => el._id === board)?.title}</Typography>
              {searchQueryResults
                .filter((task) => task.boardId === board)
                .map((task) => (
                  <ProfileTask task={task} key={task._id} />
                ))}
            </Sheet>
          ))
        : t('noResults')}
    </Box>
  );
};
