export default function () {
  ((d, w) => {
    const querySliceAll = (ele) => {
      return [].slice.call(d.querySelectorAll(ele));
    }

    /** マウスムーブで背景画像を移動 */
    const backgroundMouseMove = (() => {
      d.body.addEventListener('mousemove', (ele) => {
        let bgX = ele.pageX * .02;
        let bgY = ele.pageY * .04;
        let textX = ele.pageX * .01;
        let textY = ele.pageY * .01;
        let moonX = ele.pageX * .02;
        let moonY = ele.pageY * .04;
        let cloudX = ele.pageX * .03;
        let cloudY = ele.pageY * .03;
        let deepCloudX = ele.pageX * .03;
        let deepCloudY = ele.pageY * .05;
  
        querySliceAll('.js_backgroundPosition').forEach((val) => {
          val.style.transform = 'translate' + '(' + '-' + bgX + 'px' + ',' + '-' + bgY + 'px' + ')';
        });
        querySliceAll('.js_background_text').forEach((val) => {
          val.style.transform = 'translate' + '(' + '-' + textX + 'px' + ',' + '-' + textY + 'px' + ')';
        });
        querySliceAll('.js_moon').forEach((val) => {
          val.style.transform = 'translate' + '(' + '-' + moonX + 'px' + ',' + '-' + moonY + 'px' + ')';
        });
        querySliceAll('.js_cloud').forEach((val) => {
          val.style.transform = 'translate' + '(' + '-' + cloudX + 'px' + ',' + '-' + cloudY + 'px' + ')';
        });
        querySliceAll('.js_deep_cloud').forEach((val) => {
          val.style.transform = 'translate' + '(' + '-' + deepCloudX + 'px' + ',' + '-' + deepCloudY + 'px' + ')';
        });
      });
    })();
  })(document, window);
}