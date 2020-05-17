import {d, w, useId, useClass, isMobile, sliceCall} from '../common/util';
export default function () {

  let slideNum = 0; //スライド番号
  let scrollFlag = false; //スライドのスクロールフラグ
  let currentPosition = 0; //スライドの現在位置
  let scrollPosition = 0; //スライドのスクロール量
  let wrapperHeight = 0;
  let windowHeight = innerHeight;
  let touchStart, touchMove, touchEnd; //isMobile タッチ移動量の比較用
  const slideWrapper = document.getElementById('js_slideWrap');
  const slide = document.querySelectorAll('.js_slide');

  /** fullScreenScroll 1画面スクロール関連
   * @property {object} scrollProcessing スクロール方向判定の処理
   * @property {object} scrollEventListener scrollProcessing()をイベントリスナーに登録
   * @property {object} scrollChangeHash 表示されたスライドのハッシュにURL更新
   */
  const fullScreenScroll = {
    scrollProcessing: (event) => {
      // SPとPCで条件文を分岐
      scrollPosition = isMobile ? touchEnd : event.deltaY;
      const scrollDown = isMobile ? scrollPosition > currentPosition : scrollPosition > 0;
      if (!scrollFlag) {
        scrollFlag = true;
        if (scrollDown) {
          if (slideNum >= slide.length - 1) {
            slideNum = slide.length - 1; //スライド総数を超えない
          } else {
            slideNum++;
            slideWrapper.style.top = -windowHeight * slideNum + 'px';
          }
        } else {
          if (slideNum <= 0) {
            slideNum = 0; //スライド1枚目より前に移動させない
          } else {
            slideNum--;
            slideWrapper.style.top = -windowHeight * slideNum + 'px';
          }
        }
        clearTimeout(timerId);
        const timerId = setTimeout(() => {
          // 1画面スクロール終わってからfalseに
          scrollFlag = false;
        }, 1000);
      }
    },
    scrollEventListener: () => {
      if (isMobile) {
        slideWrapper.addEventListener('touchstart', (event) => {
          touchStart = event.touches[0].pageY;
        });
        slideWrapper.addEventListener('touchmove', (event) => {
          touchMove = event.touches[0].pageY;
        });
        slideWrapper.addEventListener('touchend', (event) => {
          touchEnd = touchStart - touchMove;
          fullScreenScroll.scrollProcessing(event);
        });
      } else {
        slideWrapper.addEventListener('wheel', (event) => {
          fullScreenScroll.scrollProcessing(event);
        });
      }
    },
    scrollChangeHash: (entries) => {
      [].slice.call(entries).forEach((val) => {
        if (val.isIntersecting) history.pushState(null, null, '#' + val.target.id);
      });
    }
  };
  const scrollOptions = {
    root: null,
    rootMargin: "-50% 0px"
  };
  const scrollObserver = new IntersectionObserver(fullScreenScroll.scrollChangeHash, scrollOptions);
  sliceCall(slide).forEach((slideElement) => {
    scrollObserver.observe(slideElement);
  });
  fullScreenScroll.scrollEventListener();


  /** moveHash
   * @param {String} targetClass ナビクリックでハッシュ先に移動
   */
  const moveHash = (targetClass) => {
    sliceCall(targetClass).forEach((btn, index) => {
      btn.addEventListener('click', (event) => {
        event.preventDefault();
        slideWrapper.style.top = '-' + windowHeight * index + 'px';
        slideNum = index;
        scrollPosition = windowHeight * index;
        currentPosition = scrollPosition;
      });
    });
  }
  moveHash(d.querySelectorAll('.js_dot'));
  moveHash(d.querySelectorAll('.js_hash'));

  //スライドの高さと表示位置を設定
  const setPosition = () => {
    sliceCall(slide).forEach((ele, index) => {
      if(location.hash == '#' + ele.id) slideNum = index;
      ele.style.height = windowHeight + `px`;
      wrapperHeight = windowHeight * slide.length;
      slideWrapper.style.height = wrapperHeight + `px`;
      slideWrapper.style.top = -windowHeight * slideNum + 'px';
    });
  }
  setPosition();
  w.addEventListener('resize', () => {
    windowHeight = innerHeight;
    setPosition();
  });

  /** setScrollTransiton スクロール要素のトランジション
   * @param {String} property 対象プロパティ
   * @param {String} duration 時間
   * @param {String} timing イージング系
   */
  const setScrollTransiton = (property = 'top', duration = '1s', timing = 'ease-in-out') => {
    slideWrapper.style.transitionProperty = property;
    slideWrapper.style.transitionDuration = duration;
    slideWrapper.style.transitionTimingFunction = timing;
  };
  setTimeout(() => {
    setScrollTransiton();
  },600);
}