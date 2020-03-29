export default function () {
  ((d, w) => {
    const querySliceAll = (ele) => {
      return [].slice.call(d.querySelectorAll(ele));
    }

    //プログレスバーのアニメーション用
    const progressBar = (() => {
      querySliceAll('.js_progressBar').forEach((val) => {
        const windowH = window.innerHeight;
        const posY = val.getBoundingClientRect().top;
        const clientHeight = val.getBoundingClientRect().height;
        if (posY + clientHeight > 0 && posY < windowH) {
          val.classList.add('is_active');
        }
      });
    })();
  })(document, window);
};