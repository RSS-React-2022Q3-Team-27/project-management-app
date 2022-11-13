import Link from '@mui/joy/Link';
import { useTranslation } from 'react-i18next';

export const CreateNewBoard = () => {
  const { t } = useTranslation();

  return (
    <Link underline={'none'} sx={{ alignSelf: 'center' }}>
      {t('createNewBoard')}
    </Link>
  );
};
