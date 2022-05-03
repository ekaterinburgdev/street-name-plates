import { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Toggle.module.scss';
const cx = classNames.bind(styles);

export default function Menu({ isHistory = null, setIsHistory }) {
  return (
    <>
      <ul className={cx('menu__list')}>
        <a className={cx('menu__list-item', { ['menu__list-item_active']: isHistory })} onClick={() => setIsHistory(true)}>Историческое здание</a>
        <a className={cx('menu__list-item', { ['menu__list-item_active']: !isHistory })} onClick={() => setIsHistory(false)}>Обычное здание</a>
      </ul>
    </>
  );
}
