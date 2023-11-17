import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';

import { FC } from 'react';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import styles from './ResultCard.module.css';

import { ROUTES } from '../../constants/routes';
import { useAppDispatch } from '../../store/hooks';
import { TaskType } from '../../store/slices/tasks/tasksApi';
import { setSearchQuery } from '../../store/slices/tasks/tasksSlice';

type ResultCardPropsType = {
  task: TaskType;
  boardTitle: string;
  columnTitle: string;
};

export const ResultCard: FC<ResultCardPropsType> = ({ task, boardTitle, columnTitle }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(setSearchQuery(''));
  };

  return (
    <Link
      to={`${ROUTES.BOARD.path}/${task.boardId}`}
      style={{ textDecoration: 'none', width: '100%' }}
      onClick={onClick}
    >
      <Card>
        <CardContent>
          <Typography level="h2" fontSize="lg" sx={{ wordBreak: 'break-word' }}>
            {task.title}
          </Typography>
          <Typography className={styles.overflow} sx={{ display: '-webkit-box', wordBreak: 'break-word' }}>
            {task.description}
          </Typography>
          <Typography level="body3">{`${t('board')}: ${boardTitle}`}</Typography>
          <Typography level="body3">{`${t('column')}: ${columnTitle}`}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
};
