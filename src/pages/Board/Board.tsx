import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
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
  const { data, isError } = useGetBoardByIdQuery(id || '', { refetchOnMountOrArgChange: true });

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
        gap: 1,
        pl: 1,
        pt: 2,
        pb: 2,
      }}
    >
      <Breadcrumbs aria-label="breadcrumb">
        <Link component={RouterLink} to={ROUTES.MAIN.path} underline="hover" color="neutral">
          {t('boards')}
        </Link>
        <Typography
          component="h2"
          sx={{
            maxWidth: '60vw',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            display: 'block',
          }}
        >
          {data?.title}
        </Typography>
      </Breadcrumbs>

      <Columns />
      <AddColumnModal />
      <AddTaskModal />
      <UpdateTaskModal />
      <AddFileModal />
    </Box>
  );
};
