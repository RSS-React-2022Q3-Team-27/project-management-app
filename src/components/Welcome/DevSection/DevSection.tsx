import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';

import { DEVELOPERS } from '../../../constants/DEVELOPERS';

export const DevSection = () => {
  const cards = DEVELOPERS.map(({ name, image }) => (
    <Card sx={{ display: 'flex', justifyContent: 'space-between', borderRadius: 40, width: '100%', p: 4 }} key={name}>
      <Box
        component="img"
        src={image}
        alt="Developer avatar"
        sx={{
          width: '100%',
          maxHeight: '200px',
        }}
      />
      <Typography level="h5" component="h3" sx={{ textAlign: 'center', fontWeight: 'sm' }}>
        {name}
      </Typography>
    </Card>
  ));

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', gap: 2 }}>
      {cards}
    </Box>
  );
};
