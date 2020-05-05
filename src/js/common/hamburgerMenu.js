import {d, header, hamburgerButton, querySliceCall, setClass} from './util';
export default function () {
  const toggleOpen = () => {
    // メニュー開閉
    hamburgerButton.classList.toggle('is_close');
    d.querySelector('.js_menuOpen').classList.toggle('is_open');
    d.body.classList.toggle('is_lock');

    // メニュー表示かつis_intersectionを持っていたら消す
    if (header.classList.contains('is_intersection')) {
      setClass(header, 'toggle', 'is_open')
    }
  }

  // ハンバーガーボタン クリック処理
  hamburgerButton.addEventListener('click', () => {
    toggleOpen();
  });

  // メニューリンク クリック処理
  querySliceCall(d.querySelectorAll('.js_link')).forEach((link) => {
    link.addEventListener('click', () => {
      toggleOpen();
    });
  });
};