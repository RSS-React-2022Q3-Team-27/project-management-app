import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import { FC, useContext, useState } from 'react';

import { Context } from '../../../Context/Context';
import { ReducerTypes } from '../../../Context/contextReducer/ReducerTypes';

import { ColumnType, useDeleteColumnMutation } from '../../../store/slices/board/boardApi';
import { ColumnTitleInput } from '../ColumnTitleInput';

type ColumnPropsType = {
  column: ColumnType;
};

export const Column: FC<ColumnPropsType> = ({ column }) => {
  const { contextDispatch } = useContext(Context);
  const [deleteColumn] = useDeleteColumnMutation();
  const [isInputActive, setInputActive] = useState(false);

  const onClickDelete = async () => {
    contextDispatch({
      type: ReducerTypes.cb,
      payload: () => deleteColumn({ columnId: column._id, boardId: column.boardId }).unwrap(),
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: 260, flexShrink: 0, height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
        {isInputActive ? (
          <ColumnTitleInput column={column} setInputActive={setInputActive} />
        ) : (
          <>
            <Typography component="h3" level="h6" sx={{ width: '100%' }} onClick={() => setInputActive(true)}>
              {column.title}
            </Typography>
            <IconButton variant="outlined" color="neutral" onClick={onClickDelete}>
              <DeleteIcon />
            </IconButton>
          </>
        )}
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
