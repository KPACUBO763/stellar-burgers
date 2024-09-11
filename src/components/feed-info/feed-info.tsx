import { FC, useEffect } from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import {
  getFeedsSelector,
  getIngredients,
  getTotalSelector,
  getTotalTodaySelector
} from '@slices';
import { useDispatch, useSelector } from '../../services/store';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders: TOrder[] = useSelector(getFeedsSelector);
  const dispatch = useDispatch();
  const feed = {
    total: useSelector(getTotalSelector),
    totalToday: useSelector(getTotalTodaySelector)
  };

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
