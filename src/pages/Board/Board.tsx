import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AddColumnModal } from '../../components/Board/AddColumnModal';
import { AddFileModal } from '../../components/Board/AddFileModal';
import { AddTaskModal } from '../../components/Board/AddTaskModal';
import { Columns } from '../../components/Board/Columns';
import { UpdateTaskModal } from '../../components/Board/UpdateTaskModal';

import { ROUTES } from '../../constants/routes';

import { useGetBoardByIdQuery } from '../../store/slices/board/boardApi';

export const Board = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id?: string }>();
  const { data, isError } = useGetBoardByIdQuery(id || '');

  useEffect(() => {
    if (isError) {
      toast.error(t('serverError'), {
        toastId: 'serverError',
      });
    }
  }, [isError, t]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        gap: { xs: 1, sm: 2 },
        pl: 2,
        pt: { xs: 2, sm: 4 },
        pb: 2,
      }}
    >
      <Link
        component={RouterLink}
        to={ROUTES.MAIN.path}
        startDecorator={<ArrowBackIosNewRoundedIcon />}
        underline="none"
        color="neutral"
        sx={{ mr: 'auto' }}
      >
        {t('toMainPage')}
      </Link>
      <Typography component="h2" sx={{ fontSize: { xs: 24, sm: 36 } }}>
        {data?.title}
      </Typography>
      <Columns />
      <AddColumnModal />
      <AddTaskModal />
      <UpdateTaskModal />
      <AddFileModal />
    </Box>
  );
};
