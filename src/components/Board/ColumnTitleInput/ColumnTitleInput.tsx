import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Box from '@mui/joy/Box';

import IconButton from '@mui/joy/IconButton';
import TextField from '@mui/joy/TextField';
import React, { FC } from 'react';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch } from '../../../store/hooks';

import { ColumnType, useUpdateColumnMutation } from '../../../store/slices/board/boardApi';
import { setTitleEditId } from '../../../store/slices/board/boardSlice';
import { AddColumnFormType } from '../AddColumnModal/AddColumnModal';

type ColumnTitleProps = {
  column: ColumnType;
};

export const ColumnTitleInput: FC<ColumnTitleProps> = ({ column }) => {
  const { control, handleSubmit } = useForm<AddColumnFormType>();
  const [updateColumn] = useUpdateColumnMutation();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<AddColumnFormType> = async (formData: AddColumnFormType) => {
    dispatch(setTitleEditId(null));

    if (formData.title === column.title) return;

    const body = {
      title: formData.title,
      order: column.order,
    };

    await updateColumn({ boardId: column.boardId, columnId: column._id, body }).unwrap();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Controller
          name="title"
          control={control}
          defaultValue={column.title}
          rules={{ required: 'Field is require' }}
          render={({ field }) => (
            <TextField
              {...field}
              autoFocus
              sx={{ width: 260 }}
              endDecorator={
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <IconButton
                    variant="soft"
                    color="success"
                    type="submit"
                    onMouseDown={(e: React.SyntheticEvent) => e.stopPropagation()}
                  >
                    <CheckRoundedIcon />
                  </IconButton>
                  <IconButton variant="soft" color="danger">
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
              }
              onBlur={() => dispatch(setTitleEditId(null))}
            />
          )}
        />
      </Box>
    </form>
  );
};
