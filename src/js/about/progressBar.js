import {d, fadeToggleClass} from '../common/util';
export default function () {
  //プログレスバーのアニメーション用
  const progressBar = d.querySelectorAll('.js_progressBar');
  [].slice.call(progressBar).forEach((bar) => {
    const windowH = window.innerHeight;
    const posY = bar.getBoundingClientRect().top;
    const clientHeight = bar.getBoundingClientRect().height;
    if (posY + clientHeight > 0 && posY < windowH) {
      bar.classList.add('is_active');
    }
  });
};