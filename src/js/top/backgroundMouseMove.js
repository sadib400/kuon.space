import { d } from '../common/util';

/** マウス移動で背景画像を逆追従
 * @param {string} id 対象のセレクタ
 * @param {number} movement 移動量の数値
 */
export default function (id, movement = .01) {
  d.body.addEventListener('mousemove', (event) => {

    const mouseX = event.pageX * movement;
    const mouseY = event.pageY * movement;
    const bgX = Math.floor((mouseX * 10)) / 10;
    const bgY = Math.floor((mouseY * 10)) / 10;
    if(d.getElementById(id)) d.getElementById(id).style.transform = 'translate3d' + '(' + '-' + bgX + 'px' + ',' + '-' + bgY + 'px' + ',' + 0 + ')';
  });
}