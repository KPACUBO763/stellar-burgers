import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getIngredients, getOrders, getProfileOrdersSelector } from '@slices';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getProfileOrdersSelector);

  useEffect(() => {
    dispatch(getOrders());
    dispatch(getIngredients());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
