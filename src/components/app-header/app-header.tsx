import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => (
  <AppHeaderUI
    userName={useSelector((state) => state.user.user?.name) || 'Личный кабинет'}
  />
);
