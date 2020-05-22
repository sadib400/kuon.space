import {d, w, isMobile, userAgentFunction, sliceCall} from '../common/util';
export default function () {
  let slideNum = 0; //スライド番号
  let scrollFlag = false; //スライドのスクロールフラグ
  let wrapperHeight = 0;
  let windowHeight = innerHeight;
  let touchStart, touchMove, touchEnd;
  const slideWrapper = document.getElementById('js_slideWrap');
  const slide = document.querySelectorAll('.js_slide');
  //IE,safariは最後までtransition-durationが残っているとうまく動作しないので付け直す
  let getDuration;
  const transitionReset = () => {
    setTimeout(() => {
      slideWrapper.style.transitionDuration = 0;
      slideWrapper.style.transitionDuration = getDuration + 's';
    }, getDuration * 1000);
  };


  /** setSlide
   * @property {object} position スライドの高さと表示位置を設定
   * @property {object} scrollTransiton スライド要素のcss-transition
   */
  const setSlide = {
    position: () => {
      sliceCall(slide).forEach((ele, index) => {
        if(location.hash == '#' + ele.id) slideNum = index;
        ele.style.height = windowHeight + `px`;
        wrapperHeight = windowHeight * slide.length;
        slideWrapper.style.height = wrapperHeight + `px`;
        slideWrapper.style.top = -windowHeight * slideNum + 'px';
      });
    },
    scrollTransiton: (property = 'top', duration = 1, timing = 'ease-in-out') => {
      slideWrapper.style.transitionProperty = property;
      slideWrapper.style.transitionDuration = duration + 's';
      slideWrapper.style.transitionTimingFunction = timing;
      getDuration = duration;
    }
  }
  w.addEventListener('resize', () => {
    windowHeight = innerHeight;
    setSlide.position();
  });
  setSlide.position();
  setTimeout(setSlide.scrollTransiton, 600);


  /** fullScreenScroll
   * @property {object} scrollProcessing スクロール方向判定の処理
   * @property {object} scrollEventListener scrollProcessing()をイベントリスナーに登録
   * @property {object} scrollChangeHash 表示されたスライドのハッシュにURL更新
   * @property {object} targetClass ナビクリックでハッシュ先に移動
   */
  const fullScreenScroll = {
    scrollProcessing: (event) => {
      // SPとPCで条件文を分岐
      const scrollPosition = isMobile ? touchEnd : event.deltaY;
      const scrollDown = scrollPosition > 0;
      if (!scrollFlag) {
        scrollFlag = true;
        userAgentFunction.isIE11(transitionReset);
        userAgentFunction.isSafari(transitionReset);
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
          // 1画面スクロール終わってからfalseに戻す
          scrollFlag = false;
        }, 1000);
      }
    },
    scrollEventListener: () => {
      if (isMobile) {
        slideWrapper.addEventListener('touchstart', (event) => {
          touchStart = event.touches[0].pageY;
          console.log(touchStart)
        });
        slideWrapper.addEventListener('touchmove', (event) => {
          touchMove = event.touches[0].pageY;
        });
        slideWrapper.addEventListener('touchend', (event) => {
          //スワイプ位置が変わっていなければ処理を抜ける
          if (touchMove == undefined || touchStart == (touchMove + touchEnd)) return;
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
      sliceCall(entries).forEach((val) => {
        if (val.isIntersecting) history.pushState(null, null, '#' + val.target.id);
      });
    },
    moveHash: (targetClass) => {
      sliceCall(targetClass).forEach((btn, index) => {
        btn.addEventListener('click', (event) => {
          event.preventDefault();
          userAgentFunction.isIE11(transitionReset);
          userAgentFunction.isSafari(transitionReset);
          slideWrapper.style.top = '-' + windowHeight * index + 'px';
          slideNum = index;
        });
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
  fullScreenScroll.moveHash(d.querySelectorAll('.js_dot'));
  fullScreenScroll.moveHash(d.querySelectorAll('.js_hash'));
}