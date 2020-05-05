import {d, header, fadeToggleClass} from '../common/util';
export default function () {
  // ヘッダー&矢印ボタンカラー
  if (d.getElementById('js_hero')) {
    const hero = d.getElementById('js_hero');
    const arrowButton = d.getElementById('js_arrowButton');
    const scrollDown = d.getElementById('js_scrollDown');

    fadeToggleClass(hero, header, 'remove', 'add');
    fadeToggleClass(hero, arrowButton, 'remove', 'add');
    fadeToggleClass(hero, scrollDown, 'remove', 'add');
  }
};