import React, { FC, memo } from 'react';
import {
  CurrencyIcon,
  FormattedDate
} from '@zlden/react-developer-burger-ui-components';

import styles from './order-info.module.css';

import { OrderInfoUIProps } from './type';
import { OrderStatus } from '@components';

export const OrderInfoUI: FC<OrderInfoUIProps> = memo(({ orderInfo }) => {
  const ingredients = Object.values(orderInfo.ingredientsInfo);

  return (
    <div className={styles.wrap}>
      {/* номер заказа #034533 */}
      <p className={`text text_type_digits-default pt-10 ${styles.number}`}>
        #{orderInfo.number}
      </p>

      {/* название заказа */}
      <h3 className={`text text_type_main-medium pb-3 pt-3 ${styles.header}`}>
        {orderInfo.name}
      </h3>

      {/* статус (Выполнен / Готовится / Создан) */}
      <OrderStatus status={orderInfo.status} />

      {/* состав */}
      <p className='text text_type_main-medium pt-10 pb-6'>Состав:</p>
      <ul className={`custom-scroll ${styles.list}`}>
        {ingredients.map((ingredient) => (
          <li key={ingredient._id} className={styles.item}>
            <div className={styles.img_wrap}>
              <div className={styles.border}>
                <img
                  className={styles.img}
                  src={ingredient.image_mobile}
                  alt={ingredient.name}
                />
              </div>
            </div>
            <p className='text text_type_main-default'>{ingredient.name}</p>
            <div className={styles.quantity}>
              <span className='text text_type_digits-default pr-2'>
                {ingredient.count} x {ingredient.price}
              </span>
              <CurrencyIcon type='primary' />
            </div>
          </li>
        ))}
      </ul>

      {/* дата и итоговая сумма */}
      <div className={styles.bottom}>
        <p className='text text_type_main-default text_color_inactive'>
          <FormattedDate date={orderInfo.date} />
        </p>
        <span className={`text text_type_digits-default pr-4 ${styles.total}`}>
          {orderInfo.total}
        </span>
        <CurrencyIcon type='primary' />
      </div>
    </div>
  );
});
