import Box from '@mui/joy/Box';
import CircularProgress from '@mui/joy/CircularProgress';
import Typography from '@mui/joy/Typography';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AccordionBoard } from './AccordionBoard';

import { useAppSelector } from '../../../../store/hooks';

import { TaskType, useGetTasksByQueryQuery } from '../../../../store/slices/tasks/tasksApi';

export const SearchResults = () => {
  const { id } = useAppSelector((state) => state.user);
  const { t } = useTranslation();
  const { searchQuery } = useAppSelector((state) => state.tasks);

  const { data, isSuccess, isFetching } = useGetTasksByQueryQuery({
    search: searchQuery,
    userId: id,
  });

  const [results, setResults] = useState<JSX.Element[] | JSX.Element>();

  useEffect(() => {
    if (isSuccess) {
      if (data.length > 0) {
        const myTasks = data.filter((task) => task.userId === id);
        const myBoards = myTasks.reduce((acc: { [key: string]: TaskType[] }, task) => {
          const boardId = task.boardId;
          const board = acc[boardId] ? acc[boardId].concat(task) : [task];
          acc[boardId] = board;
          return acc;
        }, {});

        const result = Object.keys(myBoards).map((boardId) => {
          const board = myBoards[boardId];
          return <AccordionBoard key={boardId} boardId={boardId} board={board} />;
        });

        setResults(result);
      } else {
        const noResults = <Typography>{t('noResults')}</Typography>;
        setResults(noResults);
      }
    }
  }, [isSuccess, data, id, t]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        m: '0 auto',
        width: {
          md: '80%',
        },
      }}
    >
      {isFetching ? <CircularProgress color="primary" size="lg" value={25} variant="soft" /> : results}
    </Box>
  );
};
