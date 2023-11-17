import Switch, { switchClasses } from '@mui/joy/Switch';
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
        color="neutral"
        variant="outlined"
        checked={langSwitch}
        onChange={handleSwitch}
        componentsProps={{
          input: { 'aria-label': 'lang en' },
          track: {
            children: (
              <Fragment>
                <Typography component="span" level="inherit" color="primary" fontWeight="md" sx={{ ml: '5px' }}>
                  РУ
                </Typography>
                <Typography component="span" level="inherit" color="primary" fontWeight="md" sx={{ mr: '4px' }}>
                  EN
                </Typography>
              </Fragment>
            ),
          },
        }}
        sx={{
          '--Switch-thumb-shadow': '0 0 0 1px var(--joy-palette-background-level3)',
          '--Switch-thumb-background': 'var(--joy-palette-background-surface)',
          '--Switch-thumb-size': '22px',
          '--Switch-thumb-border': '13px solid red',
          '--Switch-track-width': '62px',
          '--Switch-track-height': '32px',
          '&:hover': {
            '--Switch-thumb-background': 'var(--joy-palette-background-surface)',
          },
          [`&.${switchClasses.checked}`]: {
            '--Switch-thumb-background': 'var(--joy-palette-background-surface)',
          },
          [`&.${switchClasses.checked}:hover`]: {
            '--Switch-thumb-background': 'var(--joy-palette-background-surface)',
          },
        }}
      />
    </>
  );
};
