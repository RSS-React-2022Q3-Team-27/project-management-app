import Switch from '@mui/joy/Switch';
import Typography from '@mui/joy/Typography';
import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AppLanguage } from '../../../types/LanguageOptions';
import { LocalStorageKeys } from '../../../types/LocalStorageKeys';
import { getUserLocale } from '../../../utils/getUserLocale';

export const LanguageSelect = () => {
  const { i18n } = useTranslation();
  const [langSwitch, setLangSwitch] = useState(getUserLocale());

  useEffect(() => {
    i18n.changeLanguage(langSwitch ? AppLanguage.ru : AppLanguage.en);
  }, [i18n, langSwitch]);

  const changeLocale = (locale: AppLanguage) => {
    i18n.changeLanguage(locale);
    localStorage.setItem(LocalStorageKeys.locale, locale);
  };

  const handleSwitch = (event: ChangeEvent<HTMLInputElement>) => {
    setLangSwitch(event.target.checked);
    event.target.checked ? changeLocale(AppLanguage.ru) : changeLocale(AppLanguage.en);
  };

  return (
    <>
      <Switch
        color="primary"
        checked={langSwitch}
        onChange={handleSwitch}
        componentsProps={{
          input: { 'aria-label': 'lang en' },
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
          '--Switch-thumb-size': '26px',
          '--Switch-track-width': '66px',
          '--Switch-track-height': '32px',
        }}
      />
    </>
  );
};
