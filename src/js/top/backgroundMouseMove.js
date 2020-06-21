import { d } from '../common/util';
export default function() {
  /** マウス移動で背景画像を逆追従
   * @param {Object} id 対象のセレクタ
   * @param {Number} movement 移動量の数値
   */
  const backgroundMouseMove = (id, movement = .01) => {
    d.body.addEventListener('mousemove', (event) => {
      const mouseX = event.pageX * movement;
      const mouseY = event.pageY * movement;
      const bgX = Math.floor((mouseX * 10)) / 10;
      const bgY = Math.floor((mouseY * 10)) / 10;
      if (d.getElementById(id)) d.getElementById(id).style.transform = 'translate3d' + '(' + '-' + bgX + 'px' + ',' + '-' + bgY + 'px' + ',' + 0 + ')';
    });
  }

  backgroundMouseMove('js_background', .03);
  backgroundMouseMove('js_background_star');
  backgroundMouseMove('js_background_text', .02);
  backgroundMouseMove('js_moon', .05);
  backgroundMouseMove('js_cloud_upperLeft', .04);
  backgroundMouseMove('js_cloud_upperRight', .03);
  backgroundMouseMove('js_cloud_lowerLeft', .07);
  backgroundMouseMove('js_cloud_lowerRight', .06);
  backgroundMouseMove('js_cloud_center', .08);
}