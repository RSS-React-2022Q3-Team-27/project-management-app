import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import { FC } from 'react';

import { ColumnType } from '../../../store/slices/board/boardApi';

type ColumnPropsType = {
  column: ColumnType;
};

export const Column: FC<ColumnPropsType> = ({ column }) => {
  return (
    <Box sx={{ width: 260, flexShrink: 0 }}>
      <Typography component="h4" sx={{ fontSize: { xs: 16, sm: 24 } }}>
        {column.title}
      </Typography>
      <Button startDecorator={<AddRoundedIcon />} sx={{ width: 260 }} variant="outlined" color="neutral">
        Add task
      </Button>
    </Box>
  );
};
