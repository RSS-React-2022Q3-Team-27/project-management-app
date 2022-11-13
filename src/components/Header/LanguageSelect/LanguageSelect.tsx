import Switch from '@mui/joy/Switch';
import Typography from '@mui/joy/Typography';
import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setLocale } from '../../../store/slices/user/userSlice';

import { AppLanguage } from '../../../types/LanguageOptions';

export const LanguageSelect = () => {
  const { i18n } = useTranslation();
  const [langSwitch, setLangSwitch] = useState(false);
  const { locale } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    i18n.changeLanguage(locale);

    if (locale === AppLanguage.en) {
      setLangSwitch(false);
    } else {
      setLangSwitch(true);
    }
  }, [i18n, locale]);

  const handleSwitch = (event: ChangeEvent<HTMLInputElement>) => {
    setLangSwitch(event.target.checked);

    if (event.target.checked) {
      dispatch(setLocale(AppLanguage.ru));
      i18n.changeLanguage(AppLanguage.ru);
    } else {
      dispatch(setLocale(AppLanguage.en));
      i18n.changeLanguage(AppLanguage.en);
    }
  };

  return (
    <>
      <Switch
        color={langSwitch ? 'primary' : 'info'}
        checked={langSwitch}
        onChange={handleSwitch}
        componentsProps={{
          input: { 'aria-label': 'dark mode' },
          track: {
            children: (
              <Fragment>
                <Typography component="span" level="inherit" sx={{ ml: '12px' }}>
                  РУ
                </Typography>
                <Typography component="span" level="inherit" sx={{ mr: '12px' }}>
                  EN
                </Typography>
              </Fragment>
            ),
          },
        }}
        sx={{
          '--Switch-thumb-size': '28px',
          '--Switch-track-width': '66px',
          '--Switch-track-height': '32px',
        }}
      />
    </>
  );
};
