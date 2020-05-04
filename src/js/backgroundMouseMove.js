export default function () {
  ((d, w) => {
    const querySliceAll = (ele) => {
      return [].slice.call(d.querySelectorAll(ele));
    }

    /** マウスムーブで背景画像を移動 */
    d.body.addEventListener('mousemove', (ele) => {
      let bgX = ele.pageX * .1;
      let bgY = ele.pageY * .1;

      querySliceAll('.js_backgroundPosition').forEach((val) => {
        val.style.transform = 'translate3d' + '(' + '-' + bgX * .3 + 'px' + ',' + '-' + bgY * .3 + 'px' + ',' + '0' + ')';
      });
      querySliceAll('.js_backgroundPosition.js_star').forEach((val) => {
        val.style.transform = 'translate3d' + '(' + '-' + bgX * .1 + 'px' + ',' + '-' + bgY * .1 + 'px' + ',' + '0' + ')';
      });
      querySliceAll('.js_background_text').forEach((val) => {
        val.style.transform = 'translate3d' + '(' + '-' + bgX * .2 + 'px' + ',' + '-' + bgY * .2 + 'px' + ',' + '0' + ')';
      });
      querySliceAll('.js_moon').forEach((val) => {
        val.style.transform = 'translate3d' + '(' + '-' + bgX * .5 + 'px' + ',' + '-' + bgY * .5 + 'px' + ',' + '0' + ')';
      });
      querySliceAll('.js_cloud.js_upperLeft').forEach((val) => {
        val.style.transform = 'translate3d' + '(' + '-' + bgX * .4 + 'px' + ',' + '-' + bgY * .4 + 'px' + ',' + '0' + ')';
      });
      querySliceAll('.js_cloud.js_upperRight').forEach((val) => {
        val.style.transform = 'translate3d' + '(' + '-' + bgX * .3 + 'px' + ',' + '-' + bgY * .3 + 'px' + ',' + '0' + ')';
      });
      querySliceAll('.js_deep_cloud.js_lowerLeft').forEach((val) => {
        val.style.transform = 'translate3d' + '(' + '-' + bgX * .7 + 'px' + ',' + '-' + bgY * .7 + 'px' + ',' + '0' + ')';
      });
      querySliceAll('.js_deep_cloud.js_lowerRight').forEach((val) => {
        val.style.transform = 'translate3d' + '(' + '-' + bgX * .6 + 'px' + ',' + '-' + bgY * .6 + 'px' + ',' + '0' + ')';
      });
      querySliceAll('.js_deep_cloud.js_lowerCenter').forEach((val) => {
        val.style.transform = 'translate3d' + '(' + '-' + bgX * .8 + 'px' + ',' + '-' + bgY * .8 + 'px' + ',' + '0' + ')';
      });
    });
  })(document, window);
}