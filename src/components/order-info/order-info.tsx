import { FC, useMemo, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { selectIngredients } from '../../services/slices/ingredientsSlice';
import {
  selectOrderModalData,
  fetchOrderByNumber
} from '../../services/slices/orderSlice';
import { selectFeedOrders } from '../../services/slices/feedSlice';
import { selectProfileOrders } from '../../services/slices/profileOrdersSlice';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const location = useLocation();
  const dispatch = useDispatch();
  const ingredients = useSelector(selectIngredients);
  const orderModalData = useSelector(selectOrderModalData);
  const feedOrders = useSelector(selectFeedOrders);
  const profileOrders = useSelector(selectProfileOrders);

  const isProfileOrders = location.pathname.includes('/profile/orders');
  const orders = isProfileOrders ? profileOrders : feedOrders;

  useEffect(() => {
    if (number && !orderModalData) {
      const orderNumber = parseInt(number, 10);
      const existingOrder = orders.find(
        (order) => order.number === orderNumber
      );
      if (!existingOrder) {
        dispatch(fetchOrderByNumber(orderNumber));
      }
    }
  }, [number, orderModalData, orders, dispatch]);

  const orderData: TOrder | null = useMemo(() => {
    if (orderModalData) return orderModalData;
    if (number) {
      const orderNumber = parseInt(number, 10);
      return orders.find((order) => order.number === orderNumber) || null;
    }
    return null;
  }, [orderModalData, number, orders]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
