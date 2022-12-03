import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { Divider, IconButton } from '@mui/joy';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import Typography from '@mui/joy/Typography';
import { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { toast } from 'react-toastify';

import { AddPointModal } from './AddPointModal/AddPointModal';

import { Point } from './Point/Point';

import { Context } from '../../Context/Context';
import { ReducerTypes } from '../../Context/contextReducer/ReducerTypes';
import { IPointsResponse, useDeletePointMutation, useSetPointMutation } from '../../store/slices/points/pointsApi';

interface IProps {
  taskId: string;
  boardId: string;
  setIsShow: (val: boolean) => void;
  isShow: boolean;
  setExpanded: (val: boolean) => void;
  data?: IPointsResponse[];
}

export const Points = ({ taskId, boardId, isShow, setIsShow, setExpanded, data }: IProps) => {
  const { t } = useTranslation();
  const { contextDispatch } = useContext(Context);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addNewPoint] = useSetPointMutation();
  const [deletePoints] = useDeletePointMutation();

  const addPoint = async (title: string) => {
    setExpanded(true);
    addNewPoint({ title, boardId, taskId, done: false }).catch(() => toast.error(t('serverError')));
  };

  const delPoints = async () => {
    setIsShow(false);
    if (data) {
      await Promise.all(data.map(({ _id }) => deletePoints(_id))).catch(() => toast.error(t('serverError')));
    }
  };

  useEffect(() => {
    if (isShow) {
      setIsModalOpen(true);
    }
  }, [isShow]);

  return (
    <>
      {(isShow || !!data?.length) && (
        <>
          <Divider sx={{ my: 2 }} />
          <Box
            id="filter-status"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1,
            }}
          >
            <Typography
              id="filter-status"
              sx={{
                textTransform: 'uppercase',
                fontSize: 'xs2',
                letterSpacing: 'lg',
                fontWeight: 'lg',
                color: 'text.secondary',
                mr: 'auto',
              }}
            >
              {t('checklist')}
            </Typography>

            <IconButton
              variant="outlined"
              color="neutral"
              type="submit"
              title={t('delete')}
              size="sm"
              onClick={() => contextDispatch({ type: ReducerTypes.onConfirmAction, payload: delPoints })}
            >
              <DeleteOutlineRoundedIcon color="error" />
            </IconButton>

            <IconButton
              variant="outlined"
              color="neutral"
              type="submit"
              title={t('addPoint')}
              size="sm"
              onClick={() => setIsModalOpen(true)}
            >
              <AddRoundedIcon color="primary" />
            </IconButton>
          </Box>
          <Box role="group" aria-labelledby="filter-status">
            <List>
              {data?.map((point) => (
                <Point point={point} key={point._id} />
              ))}
            </List>
          </Box>
        </>
      )}
      <AddPointModal toggleModal={setIsModalOpen} isOpen={isModalOpen} setPointText={addPoint} />
    </>
  );
};
