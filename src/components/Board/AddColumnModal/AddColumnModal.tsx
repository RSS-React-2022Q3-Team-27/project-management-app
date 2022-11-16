import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import TextField from '@mui/joy/TextField';
import Typography from '@mui/joy/Typography';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useCreateColumnMutation } from '../../../store/slices/board/boardApi';
import { closeAddColumnModal } from '../../../store/slices/board/boardSlice';

type AddColumnFormType = {
  title: string;
};

export const AddColumnModal = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { control, handleSubmit, reset } = useForm<AddColumnFormType>();
  const { isModalOpened } = useAppSelector((state) => state.board);
  const { id } = useParams();
  const [modalStatus, setModalStatus] = useState(false);
  const [createColumn, { isError }] = useCreateColumnMutation();

  useEffect(() => {
    setModalStatus(isModalOpened);
  }, [isModalOpened]);

  const handleClose = () => {
    dispatch(closeAddColumnModal());
    setModalStatus(false);
    reset();
  };

  const onSubmit: SubmitHandler<AddColumnFormType> = async (formData: AddColumnFormType) => {
    const title = formData.title;

    handleClose();

    if (id) {
      await createColumn({ id, title }).unwrap();

      if (isError) {
        toast.error('Error');
      }
    }
  };

  return (
    <Modal open={modalStatus} onClose={handleClose}>
      <ModalDialog
        aria-labelledby="add-column-modal-dialog-title"
        sx={{
          maxWidth: 500,
          borderRadius: 'md',
          p: 3,
          boxShadow: 'lg',
        }}
      >
        <Typography id="add-column-modal-dialog-title" component="h2" level="inherit" fontSize="1.25em" mb="0.25em">
          {t('newColumn')}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              rules={{ required: 'Field is require' }}
              render={({ field }) => <TextField {...field} label={t('title')} autoFocus required />}
            />
            <Button type="submit">{t('addColumn')}</Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
};
