import {d, useId, sliceCall, setClass, useRegex} from './util';
export default function () {
  /** process イベント処理
   * @property {object} toggleOpen リンク一覧の開閉
   * @property {object} curtainOpen 遷移時の黒幕表示
   */
  const process = {
    toggleOpen: () => {
      d.body.classList.toggle('is_lock');
      useId.hamburgerButton.classList.toggle('is_close');
      d.querySelector('.js_menuOpen').classList.toggle('is_open');
      if (useId.header.classList.contains('is_intersection')) setClass(useId.header, 'toggle', 'is_open');
    },
    curtainOpen: (link) => {
      if (useRegex.topPath.test(location.pathname) && useRegex.topPath.test(link.getAttribute('href'))) {
        location.hash = '';
        location.reload();
        return;
      } else if (!useRegex.topPath.test(location.pathname) && useRegex.aboutPath.test(link.getAttribute('href'))) {
        location.reload();
        return;
      }
      if (useId.header.classList.contains('is_open')) setClass(useId.header, 'remove', 'is_open');
      d.getElementById('js_curtain').classList.add('is_active');
      setTimeout(() => {
        process.toggleOpen();
      },1000);
      setTimeout(() => {
        d.getElementById('js_curtain').classList.remove('is_active');
      },1800);
    }
  }

  // クリック処理
  sliceCall(d.querySelectorAll('.js_link')).forEach((link) => {
    link.addEventListener('click', () => {
      d.getElementById(link.id) === useId.hamburgerButton ? process.toggleOpen() : process.curtainOpen(link) ;
    });
  });
};