import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  getConstructorSelector,
  orderBurger,
  getFeeds,
  getIsAuthorizedSelector
} from '@slices';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItemsSelector = useSelector(getConstructorSelector);
  const constructorItems = constructorItemsSelector.constructorItems;
  const bun = constructorItems.bun;
  const ingredients = constructorItems.ingredients;
  const orderRequest = constructorItemsSelector.orderRequest;
  const orderModalData = constructorItemsSelector.orderModalData;
  const isAuth = useSelector(getIsAuthorizedSelector);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!isAuth && bun) {
      return navigate('/login');
    }
    if (isAuth && bun) {
      const itemsId: string[] = [
        bun._id,
        ...ingredients.map((item) => item._id)
      ];
      dispatch(orderBurger(itemsId));
    }
  };

  const closeOrderModal = () => {
    dispatch(getFeeds());
    navigate('/feed');
  };

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
