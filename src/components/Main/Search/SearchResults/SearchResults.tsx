import Box from '@mui/joy/Box';
import CircularProgress from '@mui/joy/CircularProgress';
import Typography from '@mui/joy/Typography';

import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../../../../store/hooks';
import { useGetColumnsByUserIdQuery } from '../../../../store/slices/board/boardApi';
import { useGetBoardsByUserIdQuery } from '../../../../store/slices/boards/boardsApi';
import { useGetTasksByQueryQuery } from '../../../../store/slices/tasks/tasksApi';
import { ResultCard } from '../../../ResultCard';

export const SearchResults = () => {
  const { id: userId } = useAppSelector((state) => state.user);
  const { t } = useTranslation();
  const { searchQuery } = useAppSelector((state) => state.tasks);

  const {
    data: tasksData,
    isSuccess: tasksSuccess,
    isFetching: tasksFetching,
  } = useGetTasksByQueryQuery({ search: searchQuery, userId });
  const { data: boardsData, isSuccess: boardsSuccess, isFetching: boardsFetching } = useGetBoardsByUserIdQuery(userId);
  const {
    data: columnsData,
    isSuccess: columnsSuccess,
    isFetching: columnsFetching,
  } = useGetColumnsByUserIdQuery(userId);

  const [results, setResults] = useState<JSX.Element[] | JSX.Element>();

  const isFetching = useMemo(
    () => tasksFetching || boardsFetching || columnsFetching,
    [boardsFetching, columnsFetching, tasksFetching]
  );

  const isSuccess = useMemo(
    () => tasksSuccess || boardsSuccess || columnsSuccess,
    [boardsSuccess, columnsSuccess, tasksSuccess]
  );

  useEffect(() => {
    if (isSuccess) {
      if (tasksData && tasksData.length > 0) {
        const myTasks = tasksData.filter((task) => task.userId === userId);
        const myBoards = boardsData;
        const myColumns = columnsData;
        const result = myTasks.map((task) => {
          const boardTitle = myBoards?.find((board) => board._id === task.boardId)?.title ?? '';
          const columnTitle = myColumns?.find((column) => column._id === task.columnId)?.title ?? '';
          return <ResultCard key={task._id} task={task} boardTitle={boardTitle} columnTitle={columnTitle} />;
        });
        setResults(result);
      } else {
        const noResults = (
          <Typography level="h2" fontSize="lg" sx={{ mt: 6 }}>
            {t('noResults')}
          </Typography>
        );
        setResults(noResults);
      }
    }
  }, [isSuccess, tasksData, userId, t, boardsData, columnsData]);

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
          xs: '95%',
        },
      }}
    >
      {isFetching ? <CircularProgress color="primary" value={25} sx={{ mt: 6 }} /> : results}
    </Box>
  );
};
