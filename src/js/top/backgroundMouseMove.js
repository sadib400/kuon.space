import {d} from '../common/util';
export default function () {
  /** マウス移動で背景画像を逆追従
   * @param {string} id 対象のセレクタ
   * @param {number} movement 移動量の数値
   */
  const setMouseMove = (id, movement = .01) => {
    d.querySelector('.js_mouseMove').addEventListener('mousemove', (event) => {
      const mouseX = event.pageX * movement;
      const mouseY = event.pageY * movement;
      const bgX = Math.floor((mouseX * 10)) / 10;
      const bgY = Math.floor((mouseY * 10)) / 10;
      if(d.getElementById(id)) d.getElementById(id).style.transform = 'translate3d' + '(' + '-' + bgX + 'px' + ',' + '-' + bgY + 'px' + ',' + 0 + ')';
    });
  }

  setMouseMove('js_background', .03);
  setMouseMove('js_background_star');
  setMouseMove('js_background_text', .02);
  setMouseMove('js_moon', .05);
  setMouseMove('js_cloud_upperLeft', .04);
  setMouseMove('js_cloud_upperRight', .03);
  setMouseMove('js_cloud_lowerLeft', .07);
  setMouseMove('js_cloud_lowerRight', .06);
  setMouseMove('js_cloud_center', .08);
}