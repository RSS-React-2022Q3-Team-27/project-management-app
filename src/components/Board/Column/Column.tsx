import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import { FC } from 'react';

import { useAppDispatch } from '../../../store/hooks';
import { setConfirmOpened } from '../../../store/slices/app/appSlice';
import { ColumnType } from '../../../store/slices/board/boardApi';

type ColumnPropsType = {
  column: ColumnType;
  setColumnId: (id: string) => void;
};

export const Column: FC<ColumnPropsType> = ({ column, setColumnId }) => {
  const dispatch = useAppDispatch();

  const onClickDelete = () => {
    setColumnId(column._id);
    dispatch(setConfirmOpened(true));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: 260, flexShrink: 0, height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography component="h3" level="h6">
          {column.title}
        </Typography>
        <IconButton variant="outlined" color="neutral">
          <DeleteIcon onClick={onClickDelete} />
        </IconButton>
      </Box>
      <Box sx={{ height: '100%', border: 1, borderColor: 'grey.200', borderRadius: 8 }}>
        {'tasks'}
        <Button startDecorator={<AddRoundedIcon />} sx={{ width: 260 }} variant="outlined" color="neutral">
          Add task
        </Button>
      </Box>
    </Box>
  );
};
