import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { IconButton } from '@mui/joy';
import Checkbox from '@mui/joy/Checkbox';
import ListItem from '@mui/joy/ListItem';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './Point.module.css';

import {
  IPointsResponse,
  useDeletePointMutation,
  useUpdatePointMutation,
} from '../../../store/slices/points/pointsApi';

interface IProps {
  point: IPointsResponse;
}

export const Point = ({ point }: IProps) => {
  const { _id: id, done, title } = point;
  const { t } = useTranslation();
  const [deletePoint] = useDeletePointMutation();
  const [updatePoint] = useUpdatePointMutation();
  const [isChecked, setIsChecked] = useState(done);

  const delTask = () => {
    deletePoint(id);
  };

  const togglePoint = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(!isChecked);
    const body = { title, done: e.target.checked };
    updatePoint({ id, body });
  };

  return (
    <ListItem
      className={styles.item}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 0,
      }}
    >
      <Checkbox
        label={title}
        onChange={togglePoint}
        size="sm"
        checked={isChecked}
        sx={{ textDecoration: isChecked ? 'line-through' : 'none', color: isChecked ? 'lightgrey' : 'inherit' }}
      />

      <IconButton
        className={styles.bar}
        variant="plain"
        color="danger"
        type="submit"
        title={t('deletePoint')}
        size="sm"
        onClick={delTask}
      >
        <ClearRoundedIcon />
      </IconButton>
    </ListItem>
  );
};
