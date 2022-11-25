import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { IconButton } from '@mui/joy';
import Box from '@mui/joy/Box';
import Checkbox from '@mui/joy/Checkbox';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AddPointModal } from './AddPointModal/AddPointModal';

import { useAppDispatch } from '../../store/hooks';
import { setModalState } from '../../store/slices/points/pointsSlice';

export const Points = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  return (
    <Sheet variant="outlined" sx={{ borderRadius: 'sm', width: '100%', bgcolor: 'background.body', my: 2 }}>
      <Box
        id="filter-status"
        sx={{
          textTransform: 'uppercase',
          fontSize: 'xs2',
          letterSpacing: 'lg',
          fontWeight: 'lg',
          color: 'text.secondary',
          py: 1,
          px: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography>Points</Typography>
        <IconButton variant="soft" color="info" type="submit" title={t('addPoint')} size="sm" onClick={openModal}>
          <AddRoundedIcon />
        </IconButton>
      </Box>
      <Box role="group" aria-labelledby="filter-status">
        <List>
          <ListItem
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Checkbox
              label="Declined Payment"
              // onChange={(event) => setStatus({ ...status, declinedPayment: event.target.checked })}
              sx={{ color: 'inherit' }}
              size="sm"
            />
            <IconButton variant="plain" color="danger" type="submit" title={t('addPoint')} size="sm">
              <DeleteOutlineRoundedIcon />
            </IconButton>
          </ListItem>
          <ListItem
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Checkbox
              label="Declined Payment"
              // onChange={(event) => setStatus({ ...status, declinedPayment: event.target.checked })}
              sx={{ color: 'inherit' }}
              size="sm"
            />
            <IconButton variant="plain" color="danger" type="submit" title={t('addPoint')} size="sm">
              <DeleteOutlineRoundedIcon />
            </IconButton>
          </ListItem>
          <ListItem
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Checkbox
              label="Declined Payment"
              // onChange={(event) => setStatus({ ...status, declinedPayment: event.target.checked })}
              sx={{ color: 'inherit' }}
              size="sm"
            />
            <IconButton variant="plain" color="danger" type="submit" title={t('addPoint')} size="sm">
              <DeleteOutlineRoundedIcon />
            </IconButton>
          </ListItem>
        </List>
      </Box>
      <AddPointModal toggleModal={setIsModalOpen} isOpen={isModalOpen} />
    </Sheet>
  );
};
