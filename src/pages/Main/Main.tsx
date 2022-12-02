import Sheet from '@mui/joy/Sheet';

import { MainHeader, MainResults, SearchHeader, SearchResults, SearchInput } from '../../components/Main';
import { useAppSelector } from '../../store/hooks';

export const Main = () => {
  const { searchQuery: isSearch } = useAppSelector((state) => state.tasks);

  return (
    <Sheet
      sx={{
        height: '100%',
        maxWidth: 1200,
        mx: 'auto',
        py: 3,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
      variant="soft"
    >
      <SearchInput />

      {isSearch ? (
        <>
          <SearchHeader />
          <SearchResults />
        </>
      ) : (
        <>
          <MainHeader />
          <MainResults />
        </>
      )}
    </Sheet>
  );
};
