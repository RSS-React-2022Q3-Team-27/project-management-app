import i18next from 'i18next';

import advOne from '../assets/images/advantage-1.svg';
import advTwo from '../assets/images/advantage-2.svg';
import advThree from '../assets/images/advantage-3.svg';

export const APP_ADVANTAGES = [
  {
    id: 'firstAdvantage',
    content: i18next.t('firstAdvantage'),
    image: advOne,
  },
  {
    id: 'secondAdvantage',
    content: i18next.t('secondAdvantage'),
    image: advTwo,
  },
  {
    id: 'thirdAdvantage',
    content: i18next.t('thirdAdvantage'),
    image: advThree,
  },
];
