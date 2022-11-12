import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Sheet, TextField, Typography } from '@mui/joy';
import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getBoardsByUserId } from '../../store/slices/boards/boardsThunks';

export const Main = () => {
  const userId = useAppSelector((state) => state.user.id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBoardsByUserId(userId));
    console.log('getBoardsById - ', userId);
  }, [dispatch, userId]);

  return (
    <Sheet
      sx={{
        maxWidth: 1440,
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
      <Box sx={{ maxWidth: 350, minWidth: 280 }}>
        <TextField type="text" placeholder="Search" variant="outlined" startDecorator={<SearchIcon />} />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'space-between' }}>
        <Typography level="h2">Boards</Typography>
        <Button color="neutral" variant="plain" startDecorator={<AddIcon />}>
          Add board
        </Button>
      </Box>

      <Box sx={{}}>cards</Box>
    </Sheet>
  );
};
