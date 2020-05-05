import {d, fadeToggleClass} from '../common/util';
export default function () {
  //プログレスバーのアニメーション用
  const progressBar = d.querySelectorAll('.js_progressBar');
  fadeToggleClass(progressBar, progressBar, 'add', '');
};