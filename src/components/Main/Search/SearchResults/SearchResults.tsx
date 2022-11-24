import { Box, Sheet, Typography } from '@mui/joy';

import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../../../../store/hooks';
import { ProfileTask } from '../../../Profile/UserTasks/ProfileTask/ProfileTask';

export const SearchResults = () => {
  const { searchQueryResults } = useAppSelector((state) => state.tasks);
  const { t } = useTranslation();

  const queryBoards = [...new Set(searchQueryResults.map((task) => task.boardId))];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
      {searchQueryResults.length
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
