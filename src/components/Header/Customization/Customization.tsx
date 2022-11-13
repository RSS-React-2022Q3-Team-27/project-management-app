import Box from '@mui/joy/Box';

import { LanguageSelect } from '../LanguageSelect';
import { ModeToggle } from '../ModeToggle';

export const Customization = () => {
  return (
    <Box
      sx={[
        {
          marginRight: 6,
          marginLeft: 'auto',
          gap: 2,
          bgcolor: 'background.componentBg',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
      ]}
    >
      <ModeToggle />
      <LanguageSelect />
    </Box>
  );
};
