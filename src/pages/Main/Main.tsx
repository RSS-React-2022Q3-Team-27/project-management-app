import Sheet from '@mui/joy/Sheet';
import { useEffect } from 'react';

import { MainHeader } from './MainHeader/MainHeader';
import { MainResults } from './MainResults/MainResults';
import { MainSearch } from './MainSearch/MainSearch';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getBoardsByUserId } from '../../store/slices/boards/boardsThunks';

export const Main = () => {
  const userId = useAppSelector((state) => state.user.id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBoardsByUserId(userId));
  }, [dispatch, userId]);

  return (
    <Sheet
      sx={{
        height: '100%',
        mx: 'auto',
        py: 3,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
      variant="soft"
    >
      <MainSearch />
      <MainHeader />
      <MainResults />
    </Sheet>
  );
};
