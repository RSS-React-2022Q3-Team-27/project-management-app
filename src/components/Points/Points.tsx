import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { IconButton } from '@mui/joy';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import React, { useState, useEffect, useContext } from 'react';
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
  const [points, setPoints] = useState<IPointsResponse[]>([]);
  const [addNewPoint] = useSetPointMutation();
  const [deletePoints] = useDeletePointMutation();

  const addPoint = async (title: string) => {
    setExpanded(true);
    setPoints((prev) => [...prev, { title, taskId: '0', boardId: '0', done: false, _id: '0' }]);
    addNewPoint({ title, boardId, taskId, done: false }).catch(() => toast.error(t('serverError')));
  };

  const delPoints = async () => {
    setIsShow(false);
    setPoints([]);
    await Promise.all(points.map(({ _id }) => deletePoints(_id))).catch(() => toast.error(t('serverError')));
  };

  useEffect(() => {
    if (data) {
      setPoints(data);
    }
  }, [data]);

  useEffect(() => {
    console.log(isShow);
    if (isShow) {
      setIsModalOpen(true);
    }
  }, [isShow]);

  return (
    <>
      {(isShow || !!points.length) && (
        <Sheet variant="outlined" sx={{ borderRadius: 'sm', width: '100%', bgcolor: 'background.body', my: 2 }}>
          <Box
            id="filter-status"
            sx={{
              fontSize: 'xs2',
              letterSpacing: 'lg',
              fontWeight: 'lg',
              color: 'text.secondary',
              pt: 1,
              px: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
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
                mb: 2,
              }}
            >
              {t('addCheckList')}
            </Typography>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                variant="soft"
                color="primary"
                type="submit"
                title={t('addPoint')}
                size="sm"
                onClick={() => setIsModalOpen(true)}
              >
                <AddRoundedIcon />
              </IconButton>
              <IconButton
                variant="soft"
                color="danger"
                type="submit"
                title={t('delete')}
                size="sm"
                onClick={() => contextDispatch({ type: ReducerTypes.onConfirmAction, payload: delPoints })}
              >
                <DeleteOutlineRoundedIcon />
              </IconButton>
            </Box>
          </Box>
          <Box role="group" aria-labelledby="filter-status">
            <List>
              {points.map((point) => (
                <Point point={point} key={point._id} points={points} setPoints={setPoints} />
              ))}
            </List>
          </Box>
        </Sheet>
      )}
      <AddPointModal toggleModal={setIsModalOpen} isOpen={isModalOpen} setPointText={addPoint} />
    </>
  );
};
