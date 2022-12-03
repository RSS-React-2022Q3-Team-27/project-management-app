import { Box, Typography } from '@mui/joy';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../../../store/hooks';
import { useGetColumnsByUserIdQuery } from '../../../store/slices/board/boardApi';
import { useGetBoardsByUserIdQuery } from '../../../store/slices/boards/boardsApi';
import { useGetTasksByUserIdQuery } from '../../../store/slices/tasks/tasksApi';
import { ResultCard } from '../../ResultCard';

type Names = Record<string, string>;

export const UserTasks = () => {
  const { t } = useTranslation();
  const { id } = useAppSelector((state) => state.user);
  const { data } = useGetTasksByUserIdQuery(id);
  const { data: userBoards } = useGetBoardsByUserIdQuery(id);
  const { data: userColumns } = useGetColumnsByUserIdQuery(id);

  const [boards, setBoards] = useState<Names | null>(null);
  const [columns, setColumns] = useState<Names | null>(null);

  useEffect(() => {
    if (userBoards) {
      setBoards(userBoards.reduce((acc, el) => ({ ...acc, [el._id]: el.title }), {}));
    }
    if (userColumns) {
      setColumns(userColumns.reduce((acc, el) => ({ ...acc, [el._id]: el.title }), {}));
    }
  }, [userBoards, userColumns]);

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
      <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
        {data?.length
          ? data.map((task) => (
              <ResultCard
                key={task._id}
                task={task}
                boardTitle={boards ? boards[task.boardId] : ''}
                columnTitle={columns ? columns[task.columnId] : ''}
              />
            ))
          : t('yourHaventtGotTasks')}
      </Box>
    </Box>
  );
};
