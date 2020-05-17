import {d, sliceCall, setId} from '../common/util';
export default function () {
  const slide = d.querySelectorAll('.js_slide'); //スライド要素

  /** slideFade フェードイン・アウトでis_activeを付替
   * @param {String} element fade対象セレクタ
   * @param {String} add fade要素のis_active付替[true,false]
   */
  const slideFade = (element, add = true, target = '.js_slideIn') => {
    sliceCall(d.querySelectorAll('#' + element.id + ' ' + target)).forEach((fadeElement) => {
      fadeElement.classList[add ? 'add' : 'remove']('is_active');
    })
  };

  /** currentNav カレントナビ関連
   * @param {String} element 現在見えている範囲のidに合わせてナビをアクティブにする
   */
  const currentNav = (element) => {
    const currentActive = d.querySelector(".js_dot.is_active");
    if (currentActive !== null) currentActive.classList.remove("is_active");
    d.querySelector(`a[href='#${element.id}']`).parentNode.classList.add("is_active");
  }

  /** カレントナビとフェードイン実行 */
  const slideInEvent = (entries) => {
    [].slice.call(entries).forEach((entries) => {
      if (entries.isIntersecting) {
        currentNav(entries.target);
        slideFade(entries.target);
      } else {
        slideFade(entries.target, false);
      }
    });
  };
  const slideInOptions = {
    root: null,
    rootMargin: "-50% 0px"
  };
  const slideInObserver = new IntersectionObserver(slideInEvent, slideInOptions);
  sliceCall(slide).forEach((slideElement) => {
    slideInObserver.observe(slideElement);
  });


  /** 満月要素のフェードインアウト */
  const moonInEvent = (entries) => {
    [].slice.call(entries).forEach((entries) => {
      if (entries.isIntersecting) {
        slideFade(entries.target, true, '.js_moonItem');
      }
    });
  };
  const moonOutEvent = (entries) => {
    [].slice.call(entries).forEach((entries) => {
      if (!entries.isIntersecting) {
        slideFade(entries.target, false, '.js_moonItem');
      }
    });
  };
  const moonOutOptions = {
    root: null,
    rootMargin: '-80% 0px 0px 0px'
  };
  const moonOutObserver = new IntersectionObserver(moonInEvent, slideInOptions);
  moonOutObserver.observe(d.querySelector('#js_slideMoon'));
  const moonInObserver = new IntersectionObserver(moonOutEvent, moonOutOptions);
  moonInObserver.observe(d.querySelector('#js_slideMoon'));
}