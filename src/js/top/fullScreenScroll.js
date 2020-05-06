import {d, w, isMobile, querySliceCall} from '../common/util';
export default function () {
  let slideNum = 0; //スライド番号
  let scrollFlag = false; //スライドのスクロールフラグ
  let currentPosition = 0; //スライドの現在位置
  let scrollPosition = 0; //スライドのスクロール量
  let wrapperHeight = 0;
  let windowHeight = innerHeight;
  const slideWrapper = d.getElementById('js_slideWrap'); //各スライドを囲む親要素
  const slide = d.querySelectorAll('.js_slide'); //スライド要素


  //スクロールのcss-transition設定
  const setScrollTransiton = (property = 'top', duration = '1s', timing = 'ease-in-out') => {
    slideWrapper.style.transitionProperty = property;
    slideWrapper.style.transitionDuration = duration;
    slideWrapper.style.transitionTimingFunction = timing;
  };
  setScrollTransiton();


  /** fullScreenScroll 1画面スクロール
   * @property {object} scrollProcessing スクロール方向判定
   * @property {object} scrollEvent イベントリスナーに登録
   */
  const fullScreenScroll = {
    scrollProcessing: (event) => {
      // SPとPCで条件文を分岐
      scrollPosition = isMobile ? event.changedTouches[0].pageY : event.deltaY;
      const conditions = isMobile ? scrollPosition > currentPosition : scrollPosition > 0;
      if (!scrollFlag) {
        scrollFlag = true;
        if (conditions) { //下方向
          if (slideNum >= slide.length - 1) {
            slideNum = slide.length - 1; //スライド総数を超えないように代入
          } else {
            slideNum++;
            slideWrapper.style.top = -windowHeight * slideNum + 'px';
          }
        } else { //上方向
          if (slideNum <= 0) { //スライドを0より小さくさせない
            slideNum = 0;
          } else {
            slideNum--;
            slideWrapper.style.top = -windowHeight * slideNum + 'px';
          }
        }
        setTimeout(() => { //1s後にFlag戻し
          scrollFlag = false;
        }, 1000);
      }
      currentPosition = scrollPosition; //比較値を上書き
    },
    scrollEvent: (entries) => {
      [].slice.call(entries).forEach((val) => {
        if (val.isIntersecting) {
          history.pushState(null, null, '#' + val.target.id);
          //SPとPCでイベント分岐
          const eventType = isMobile ? 'touchmove' : 'wheel';
          w.addEventListener(eventType, (event) => {
            fullScreenScroll.scrollProcessing(event);
          });
        }
      });
    }
  };
  const scrollOptions = {
    root: null,
    rootMargin: "-50% 0px"
  };
  const scrollObserver = new IntersectionObserver(fullScreenScroll.scrollEvent, scrollOptions);
  querySliceCall(slide).forEach((slideElement) => {
    scrollObserver.observe(slideElement);
  });


  /** slideFade フェードイン・アウトでis_activeを付替
   * @param {String} ele fade対象セレクタ
   * @param {String} type fade要素のis_active付替
   */
  const slideFade = (ele, type = 'in') => {
    querySliceCall(d.querySelectorAll('#' + ele.id + ' .js_slideIn')).forEach((fadeElement) => {
      fadeElement.classList[type === 'in' ? 'add' : 'remove']('is_active');
    })
  };

  /** currentNav カレントナビ関連
   * @property {Object} isActive 現在見えている範囲のidに合わせてナビをアクティブにする
   * @property {Object} moveHash ナビクリックでハッシュ先に移動
   */
  const currentNav = {
    isActive: (ele) => {
      const currentActive = d.querySelector(".js_dot.is_active");
      if (currentActive !== null) {
        currentActive.classList.remove("is_active");
      }
      d.querySelector(`a[href='#${ele.id}']`).parentNode.classList.add("is_active");
    },
    moveHash: (targetClass) => {
      querySliceCall(targetClass).forEach((btn, index) => {
        btn.addEventListener('click', (event) => {
          event.preventDefault();
          slideWrapper.style.top = '-' + windowHeight * index + 'px';
          slideNum = index;
          scrollPosition = windowHeight * index;
          currentPosition = scrollPosition;
        });
      });
    }
  };
  currentNav.moveHash(d.querySelectorAll('.js_dot'));
  currentNav.moveHash(d.querySelectorAll('.js_link'));

  /** カレントナビとフェードイン実行 */
  const slideInEvent = (entries) => {
    [].slice.call(entries).forEach((entries) => {
      if (entries.isIntersecting) {
        currentNav.isActive(entries.target);
        slideFade(entries.target);
      } else {
        slideFade(entries.target, null);
      }
    });
  };
  const slideInOptions = {
    root: null,
    rootMargin: "-50% 0px"
  };
  const slideInObserver = new IntersectionObserver(slideInEvent, slideInOptions);
  querySliceCall(slide).forEach((slideElement) => {
    slideInObserver.observe(slideElement);
  });

  //スライドの高さと表示位置を設定
  const setPosition = () => {
    querySliceCall(slide).forEach((ele, index) => {
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
}