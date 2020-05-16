import {d, setId, fadeClass} from '../common/util';
export default function () {
  // ヘッダー&矢印ボタンカラー
  const hero = d.getElementById('js_hero');
  const arrowButton = d.getElementById('js_arrowIcon');
  const scrollDown = d.getElementById('js_scrollDown');

  fadeClass(hero, setId.header, 'remove', 'add');
  fadeClass(hero, arrowButton, 'remove', 'add');
  fadeClass(hero, scrollDown, 'remove', 'add');
};