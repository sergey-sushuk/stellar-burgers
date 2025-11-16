import { FC, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { BurgerConstructorUI } from '@ui';
import {
  selectConstructorBun,
  selectConstructorIngredients
} from '../../services/slices/constructorSlice';
import {
  selectOrderModalData,
  selectOrderLoading,
  createOrder,
  clearOrderModalData
} from '../../services/slices/orderSlice';
import { selectUser } from '../../services/slices/userSlice';
import { clearConstructor } from '../../services/slices/constructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bun = useSelector(selectConstructorBun);
  const ingredients = useSelector(selectConstructorIngredients);
  const orderModalData = useSelector(selectOrderModalData);
  const orderRequest = useSelector(selectOrderLoading);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (orderModalData) {
      dispatch(clearConstructor());
    }
  }, [orderModalData, dispatch]);

  const constructorItems = {
    bun,
    ingredients: ingredients && Array.isArray(ingredients) ? ingredients : []
  };

  const onOrderClick = () => {
    if (!bun || orderRequest) return;
    if (!user) {
      navigate('/login');
      return;
    }

    const ingredientsIds = [
      bun._id,
      ...(ingredients && Array.isArray(ingredients)
        ? ingredients.map((item) => item._id)
        : []),
      bun._id
    ];

    dispatch(createOrder(ingredientsIds));
  };

  const closeOrderModal = () => {
    dispatch(clearOrderModalData());
  };

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      (ingredients && Array.isArray(ingredients)
        ? ingredients.reduce((s, v) => s + v.price, 0)
        : 0),
    [bun, ingredients]
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
