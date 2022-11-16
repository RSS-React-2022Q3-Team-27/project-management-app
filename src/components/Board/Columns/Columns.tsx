import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAppDispatch } from '../../../store/hooks';

import { useGetColumnsInBoardQuery } from '../../../store/slices/board/boardApi';
import { openAddColumnModal } from '../../../store/slices/board/boardSlice';
import { Column } from '../Column';

export const Columns = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id?: string }>();
  const { data, isError } = useGetColumnsInBoardQuery(id || '');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isError) {
      toast.error('Error');
    }
  }, [isError]);

  const handleClick = () => {
    dispatch(openAddColumnModal());
  };

  const boardColumns = data?.map((column) => <Column key={column._id} column={column} />);

  return (
    <Box sx={{ flexGrow: 1, position: 'relative' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          overflowX: 'auto',
          position: 'absolute',
          gap: 1,
          inset: 0,
          pr: 2,
        }}
      >
        {boardColumns}
        <Button startDecorator={<AddRoundedIcon />} sx={{ width: 260, flexShrink: 0 }} onClick={handleClick}>
          {t('newColumn')}
        </Button>
      </Box>
    </Box>
  );
};
