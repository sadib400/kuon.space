import {d} from '../common/util';
export default function () {
  /** マウス移動で背景画像を逆追従
   * @param {string} id 対象のセレクタ
   * @param {number} movement 移動量の数値
   */
  const setMouseMove = (id, movement = .1) => {
    d.querySelector('.js_mouseMove').addEventListener('mousemove', (event) => {
      const bgX = Math.floor((event.pageX * movement) * .1);
      const bgY = Math.floor((event.pageY * movement) * .1);
      if(d.getElementById(id)) d.getElementById(id).style.transform = 'translate3d' + '(' + '-' + bgX + 'px' + ',' + '-' + bgY + 'px' + ',' + 0 + ')' + ' rotate(0.0001deg)';
    });
  }

  setMouseMove('js_background', .3);
  setMouseMove('js_background_star');
  setMouseMove('js_background_text', .2);
  setMouseMove('js_moon', .5);
  setMouseMove('js_cloud_upperLeft', .4);
  setMouseMove('js_cloud_upperRight', .3);
  setMouseMove('js_cloud_lowerLeft', .7);
  setMouseMove('js_cloud_lowerRight', .6);
  setMouseMove('js_cloud_center', .8);
}