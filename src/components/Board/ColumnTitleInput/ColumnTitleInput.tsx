import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Box from '@mui/joy/Box';

import IconButton from '@mui/joy/IconButton';
import TextField from '@mui/joy/TextField';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { ColumnType, useUpdateColumnMutation } from '../../../store/slices/board/boardApi';
import { AddColumnFormType } from '../AddColumnModal/AddColumnModal';

type ColumnTitleProps = {
  column: ColumnType;
  setInputActive: (isInputActive: boolean) => void;
};

export const ColumnTitleInput = ({ column, setInputActive }: ColumnTitleProps) => {
  const { control, handleSubmit } = useForm<AddColumnFormType>();
  const [updateColumn] = useUpdateColumnMutation();

  const onSubmit: SubmitHandler<AddColumnFormType> = async (formData: AddColumnFormType) => {
    setInputActive(false);

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
                  <IconButton variant="soft" color="success" type="submit">
                    <CheckRoundedIcon />
                  </IconButton>
                  <IconButton variant="soft" color="danger" onClick={() => setInputActive(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
              }
            />
          )}
        />
      </Box>
    </form>
  );
};
