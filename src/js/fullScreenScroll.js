export default function () {
  ((d, w) => {
    const querySliceAll = (ele) => {
      return [].slice.call(d.querySelectorAll(ele));
    }
    let slideNum = 0; //スライド番号
    let scrollFlag = false; //スライドのスクロールフラグ
    let currentPosition = 0; //スライドの現在位置
    let scrollPosition = 0; //スライドのスクロール量
    let wrapperHeight = 0;
    let windowHeight = w.innerHeight;
    const slideWrapper = d.getElementById('js_slideWrap'); //各スライドを囲む親要素
    const slide = document.querySelectorAll('.js_slide'); //スライド要素
    const isMobile = navigator.userAgent.match(/iPhone|Android.+Mobile/);

    //スクロールのcss-transition設定
    const setTransiton = (property = null, duration = null, timing = null) => {
      let transition = {
        property: property,
        duration: duration,
        timingFunction: timing
      }
      slideWrapper.style.transitionProperty = transition.property;
      slideWrapper.style.transitionDuration = transition.duration;
      slideWrapper.style.transitionTimingFunction = transition.timingFunction;
    };

    /** フルスクリーンスクロール */
    const scrollEvent = (entries) => {
      [].slice.call(entries).forEach((val) => {
        if (val.isIntersecting) {
          /** スクロール処理 */
          history.pushState(null, null, '#' + val.target.id);
          const scrollProcessing = (event) => {
            // スマホとPCで条件文を分岐
            scrollPosition = isMobile ? scrollPosition = event.changedTouches[0].pageY : scrollPosition = event.deltaY;
            const conditions = isMobile ? scrollPosition > currentPosition : scrollPosition > 0;
            // スクロールされたらtop値を指定
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
              setTimeout(() => { //スクロール禁止解除
                scrollFlag = false;
              }, 1000);
            }
            currentPosition = scrollPosition; //比較値を上書き
          }

          //モバイルとデスクトップでイベント分岐
          if (isMobile) {
            w.addEventListener('touchmove', (event) => {
              scrollProcessing(event);
            });
          } else {
            w.addEventListener('wheel', (event) => {
              scrollProcessing(event);
            });
          }
        }
      });
    }
    const scrollOptions = {
      root: null,
      rootMargin: "-50% 0px"
    };
    const scrollObserver = new IntersectionObserver(scrollEvent, scrollOptions);
    querySliceAll(".js_slide").forEach((slideElement) => {
      scrollObserver.observe(slideElement);
    });


    /** フェードイン要素にactive付け替え */
    const slideFadeIn = (ele) => {
      querySliceAll('#' + ele.id + ' .js_slideIn').forEach((slideInElement) => {
        slideInElement.classList.add('is_active');
      });
    };
    const slideFadeOut = (ele) => {
      querySliceAll('#' + ele.id + ' .js_slideIn').forEach((slideOutElement) => {
        slideOutElement.classList.remove('is_active');
      });
    };

    /** カレントナビ */
    const currentNav = (ele) => {
      //現在見えている範囲のidに合わせてナビをアクティブにする
      const currentActive = d.querySelector(".js_dot.is_active");
      if (currentActive !== null) {
        currentActive.classList.remove("is_active");
      }
      d.querySelector(`a[href='#${ele.id}']`).parentNode.classList.add("is_active");
      //ハッシュ先に移動
      const toHash = (targetClass) => {
        querySliceAll(targetClass).forEach((btn, index) => {
          btn.addEventListener('click', (event) => {
            event.preventDefault();
            slideWrapper.style.top = '-' + windowHeight * index + 'px';
            slideNum = index;
            scrollPosition = windowHeight * index;
            currentPosition = scrollPosition;
          });
        });
      }
      toHash('.js_dot');
      toHash('.js_link');
    };

    /** カレントナビとフェードイン実行 */
    const slideInEvent = (entries) => {
      [].slice.call(entries).forEach((entries) => {
        if (entries.isIntersecting) {
          currentNav(entries.target);
          slideFadeIn(entries.target);
        } else {
          slideFadeOut(entries.target);
        }
      });
    };
    const slideInOptions = {
      root: null,
      rootMargin: "-50% 0px"
    };
    const slideInObserver = new IntersectionObserver(slideInEvent, slideInOptions);
    querySliceAll(".js_slide").forEach((slideElement) => {
      slideInObserver.observe(slideElement);
    });

    //スライドの高さと位置を設定
    const setHeightStyle = () => {
      querySliceAll('.js_slide').forEach((ele) => {
        switch (location.hash) {
          case '#top':
            slideNum = 0;
            break;
          case '#reile':
            slideNum = 1;
            break;
          case '#about':
            slideNum = 2;
            break;
          case '#contact':
            slideNum = 3;
            break;
        }
        ele.style.height = windowHeight + `px`;
        wrapperHeight = windowHeight * slide.length;
        slideWrapper.style.height = wrapperHeight + `px`;
        slideWrapper.style.top = -windowHeight * slideNum + 'px';
      });
    }
    setHeightStyle();
    w.addEventListener('resize', () => {
      windowHeight = w.innerHeight;
      setHeightStyle();
    });

    // transition設定
    if (window.performance) {
      if (performance.navigation.type === 1) {
        setTimeout(() => {
          setTransiton('top','1s','ease-in-out');
        }, 0);
      } else {
        setTransiton('top','1s','ease-in-out');
      }
    }
  })(document, window);
}