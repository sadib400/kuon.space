import {d, w, isMobile, setClass, sliceCall} from '../common/util';
export default function () {
  /** slideFade TOPページ用のフェードイン・アウト
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
    d.querySelector(`span[data-href='#${element.id}']`).parentNode.classList.add("is_active");
  }

  /** カレントナビとフェードイン実行 */
  const aboutButton = d.querySelector('#about .js_btn');
  const slideInEvent = (entries) => {
    sliceCall(entries).forEach((entries) => {
      if (entries.isIntersecting) {
        currentNav(entries.target);
        slideFade(entries.target);
      } else {
        slideFade(entries.target, false);
        if (aboutButton && aboutButton.classList.contains('is_position')) setClass(aboutButton, 'remove', 'is_position');
      }
    });
  };
  const slideInOptions = {
    root: null,
    rootMargin: "-50% 0px"
  };
  const slideInObserver = new IntersectionObserver(slideInEvent, slideInOptions);
  sliceCall(document.querySelectorAll('.js_slide')).forEach((slideElement) => {
    slideInObserver.observe(slideElement);
  });


  /** 満月要素のフェードインアウト */
  const moonInEvent = (entries) => {
    sliceCall(entries).forEach((entries) => {
      if (entries.isIntersecting) slideFade(entries.target, true, '.js_moonItem');
    });
  };
  const moonOutEvent = (entries) => {
    sliceCall(entries).forEach((entries) => {
      if (!entries.isIntersecting) slideFade(entries.target, false, '.js_moonItem');
    });
  };
  const moonInOptionsSP = {
    root: null,
    rootMargin: '0px 0px -55% 0px'
  };
  const moonOutOptionsPC = {
    root: null,
    rootMargin: '-80% 0px 0px 0px'
  };
  const moonOutOptionsSP = {
    root: null,
    rootMargin: '-45% 0px 0px 0px'
  };
  const moonInObserver = new IntersectionObserver(moonInEvent, isMobile ? moonInOptionsSP : slideInOptions);
  moonInObserver.observe(d.querySelector('#js_slideMoon'));
  const moonOutObserver = new IntersectionObserver(moonOutEvent, isMobile ? moonOutOptionsSP : moonOutOptionsPC);
  moonOutObserver.observe(d.querySelector('#js_slideMoon'));

  w.addEventListener('resize', () => {
    sliceCall(d.querySelectorAll('#js_slideMoon' + ' ' + '.js_moonItem')).forEach((moon) => {
      moon.classList.add('is_active');
    })
  });
}