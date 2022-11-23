import Sheet from '@mui/joy/Sheet';

import { MainHeader } from './MainHeader/MainHeader';
import { MainResults } from './MainResults/MainResults';
import { MainSearch } from './MainSearch/MainSearch';
import { SearchResults } from './SearchResults/SearchResults';

import { useAppSelector } from '../../store/hooks';

export const Main = () => {
  const { searchQuery } = useAppSelector((state) => state.tasks);
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
      {searchQuery ? <SearchResults /> : <MainResults />}
    </Sheet>
  );
};
