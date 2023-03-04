import classNames from 'classnames';
import type { FC } from 'react';
import { FaArrowLeft, FaArrowRight, FaCheckCircle, FaPlay, FaShoppingCart, FaUser } from 'react-icons/fa';

import * as styles from './Icon.styles';

type Props = {
  type: 'FaUser' | 'FaShoppingCart' | 'FaArrowLeft' | 'FaArrowRight' | 'FaPlay' | 'FaCheckCircle';
  width: number;
  height: number;
  color: string;
};

export const Icon: FC<Props> = ({ color, height, type, width }) => {
  let Icon;
  switch (type) {
    case 'FaUser':
      Icon = FaUser;
      break;
    case 'FaShoppingCart':
      Icon = FaShoppingCart;
      break;
    case 'FaArrowLeft':
      Icon = FaArrowLeft;
      break;
    case 'FaArrowRight':
      Icon = FaArrowRight;
      break;
    case 'FaPlay':
      Icon = FaPlay;
      break;
    case 'FaCheckCircle':
      Icon = FaCheckCircle;
      break;
  }
  return (
    <span className={classNames(type, styles.container({ color, height, width }))}>
      <Icon />
    </span>
  );
};
