import Sheet from '@mui/joy/Sheet';

import { MainHeader } from './MainHeader/MainHeader';
import { MainResults } from './MainResults/MainResults';
import { MainSearch } from './MainSearch/MainSearch';

export const Main = () => {
  return (
    <Sheet
      sx={{
        height: '100%',
        mx: 'auto',
        py: 3,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
      variant="soft"
    >
      <MainSearch />
      <MainHeader />
      <MainResults />
    </Sheet>
  );
};
