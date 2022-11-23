import { Box, Sheet, Typography } from '@mui/joy';

import { useTranslation } from 'react-i18next';

import styles from './SearchResults.module.css';

import { ProfileTask } from '../../../../components/Profile/UserTasks/ProfileTask/ProfileTask';

import { useAppSelector } from '../../../../store/hooks';
import { useGetBoardsByUserIdQuery } from '../../../../store/slices/boards/boardsApi';

export const SearchResults = () => {
  const { searchQueryResults } = useAppSelector((state) => state.tasks);
  const { id } = useAppSelector((state) => state.user);
  const { data } = useGetBoardsByUserIdQuery(id);
  const { t } = useTranslation();

  const queryBoards = [...new Set(searchQueryResults.map((task) => task.boardId))];

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
