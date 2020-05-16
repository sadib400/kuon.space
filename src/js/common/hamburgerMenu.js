import {d, setId, sliceCall, setClass, setRegex, isMobile} from './util';
export default function () {
  /** process イベント処理
   * @property {object} toggleOpen リンク一覧の開閉
   * @property {object} curtainOpen 遷移時の黒幕表示
   */
  const process = {
    toggleOpen: () => {
      d.body.classList.toggle('is_lock');
      setId.hamburgerButton.classList.toggle('is_close');
      d.querySelector('.js_menuOpen').classList.toggle('is_open');
      if (setId.header.classList.contains('is_intersection')) setClass(setId.header, 'toggle', 'is_open');
    },
    curtainOpen: (link) => {
      if (!setRegex.topPath.test(location.pathname) && setRegex.aboutPath.test(link.getAttribute('href'))) {
        location.reload();
        return;
      }
      if (setId.header.classList.contains('is_open')) setClass(setId.header, 'remove', 'is_open');
      d.getElementById('js_curtain').classList.add('is_active');
      setTimeout(() => {
        process.toggleOpen();
      },1000);
      setTimeout(() => {
        d.getElementById('js_curtain').classList.remove('is_active');
      },1500);
    }
  }

  // クリック処理
  sliceCall(d.querySelectorAll('.js_link')).forEach((link) => {
    link.addEventListener('click', () => {
      d.getElementById(link.id) === setId.hamburgerButton ? process.toggleOpen() : process.curtainOpen(link) ;
    });
  });
};