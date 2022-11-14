import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';

import { APP_ADVANTAGES } from '../../../constants/APP_ADVANTAGES';

export const AdvantageSection = () => {
  const cards = APP_ADVANTAGES.map(({ content, image, id }) => (
    <Card sx={{ display: 'flex', justifyContent: 'space-between', borderRadius: 40, width: '100%', p: 4 }} key={id}>
      <Typography level="h5" component="h3" sx={{ textAlign: 'center', fontWeight: 'sm' }}>
        {content}
      </Typography>
      <Box
        component="img"
        src={image}
        alt="Promo advantage"
        sx={{
          width: '100%',
          maxHeight: '200px',
        }}
      />
    </Card>
  ));

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', gap: 2 }}>
      {cards}
    </Box>
  );
};
