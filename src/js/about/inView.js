import {d, useId, inViewClasses} from '../common/util';
export default function () {
  // ヘッダー&矢印ボタン クラス付替
  const hero = d.getElementById('js_hero');
  inViewClasses(hero, useId.header, 'remove', 'add');
  inViewClasses(hero, d.getElementById('js_arrowIcon'), 'remove', 'add');
  inViewClasses(hero, d.getElementById('js_scrollDown'), 'remove', 'add');
  inViewClasses(d.querySelectorAll('.js_progressBar'));
};