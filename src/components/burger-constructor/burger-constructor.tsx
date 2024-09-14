import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  getConstructorSelector,
  orderBurger,
  getIsAuthorizedSelector,
  resetModalData
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
  const itemsId: string[] = [
    ...ingredients.map((element) => element._id),
    bun?._id
  ].filter((id): id is string => id !== undefined);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!isAuth && bun) {
      return navigate('/login');
    }
    dispatch(orderBurger(itemsId));
  };

  const closeOrderModal = () => {
    dispatch(resetModalData());
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
