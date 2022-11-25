import { Box } from '@mui/joy';
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
import { setModalState } from '../../../store/slices/points/pointsSlice';

interface AddPointFormType {
  title: string;
}

interface IProps {
  toggleModal: (val: boolean) => void;
  isOpen: boolean;
}

export const AddPointModal = ({ toggleModal, isOpen }: IProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { control, handleSubmit, reset } = useForm<AddPointFormType>();
  const { id } = useParams();

  // useEffect(() => {
  //   setModalStatus(isModalOpened);
  // }, [isModalOpened]);

  // const handleClose = () => {
  //   dispatch(closeAddColumnModal());
  //   setModalStatus(false);
  //   reset();
  // };

  const onSubmit: SubmitHandler<AddPointFormType> = async (formData: AddPointFormType) => {
    const body = {
      title: formData.title,
    };

    toggleModal(false);
  };

  return (
    <Modal
      aria-labelledby="add-point-modal-dialog-title"
      aria-describedby="add-point-modal-dialog-description"
      open={isOpen}
      onClose={() => toggleModal(false)}
    >
      <ModalDialog variant="outlined" role="add-point-modal">
        <Typography id="add-point-modal-dialog-title" component="h2" level="inherit" fontSize="1.25em" mb="0.25em">
          {t('newPoint')}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              rules={{ required: 'Field is require' }}
              render={({ field }) => <TextField {...field} label={t('text')} autoFocus required />}
            />
            <Button type="submit">{t('addColumn')}</Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
};
