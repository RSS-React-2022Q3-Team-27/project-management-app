import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { CircularProgress } from '@mui/joy';
import Box from '@mui/joy/Box';

import IconButton from '@mui/joy/IconButton';
import TextField from '@mui/joy/TextField';
import React, { FC, useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useAppDispatch } from '../../../store/hooks';

import { ColumnType, useUpdateColumnMutation } from '../../../store/slices/board/boardApi';
import { setTitleEditId } from '../../../store/slices/board/boardSlice';
import { AddColumnFormType } from '../AddColumnModal/AddColumnModal';

type ColumnTitleProps = {
  column: ColumnType;
};

export const ColumnTitleInput: FC<ColumnTitleProps> = ({ column }) => {
  const { control, handleSubmit } = useForm<AddColumnFormType>();
  const [updateColumn, { isLoading, isSuccess }] = useUpdateColumnMutation();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setTitleEditId(null));
    }
  }, [isSuccess, dispatch]);

  const onSubmit: SubmitHandler<AddColumnFormType> = async (formData: AddColumnFormType) => {
    if (formData.title === column.title) return;

    const body = {
      title: formData.title,
      order: column.order,
    };

    await updateColumn({ boardId: column.boardId, columnId: column._id, body })
      .unwrap()
      .then(() => toast.success(t('columnUpdated')))
      .catch(() => toast.error(t('serverError')));
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
              sx={{ width: 264 }}
              endDecorator={
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <IconButton variant="solid" color="success" type="submit">
                    {isLoading ? <CircularProgress size="sm" color="success" /> : <CheckRoundedIcon />}
                  </IconButton>
                  <IconButton variant="solid" color="danger" onClick={() => dispatch(setTitleEditId(null))}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
              }
              onMouseDown={(e: React.SyntheticEvent) => e.stopPropagation()}
              onBlur={() => dispatch(setTitleEditId(null))}
            />
          )}
        />
      </Box>
    </form>
  );
};
