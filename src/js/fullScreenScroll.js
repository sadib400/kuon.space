export default function () {
  ((d, w) => {
    const querySliceAll = (ele) => {
      return [].slice.call(d.querySelectorAll(ele));
    }

    /** フルスクリーンスクロール */
    const fullScreenScroll = (() => {
      let slideNum = 0; //スライド番号
      let scrollFlag = false; //スライドのスクロールフラグ
      let currentPosition = 0; //スライドの現在位置
      let scrollPosition = 0; //スライドのスクロール量
      let windowHeight = w.innerHeight;
      const slideWrapper = d.getElementById('js_content'); //各スライドを囲む要素
      const slide = document.querySelectorAll('.js_slide'); //スライド要素
      
      //スライドの高さと位置を設定
      querySliceAll('.js_slide').forEach((val, index) => {
        val.style.height = windowHeight + `px`;
        let allHeight = windowHeight * index + windowHeight;
        d.body.style.height = allHeight + `px`;
        slideWrapper.style.height = allHeight + `px`;
        slideWrapper.style.top = -windowHeight * slideNum + 'px';
      });
      w.addEventListener('resize', () => {
        windowHeight = w.innerHeight;
        querySliceAll('.js_slide').forEach((val, index) => {
          val.style.height = windowHeight + `px`;
          let allHeight = windowHeight * index + windowHeight;
          d.body.style.height = allHeight + `px`;
          slideWrapper.style.height = allHeight + `px`;
          slideWrapper.style.top = -windowHeight * slideNum + 'px';
        });
      });

      /** フルスクリーンスクロール実行 */
      const scrollEvent = (entries) => {
        [].slice.call(entries).forEach((val) => {
          if (val.isIntersecting) {
            /** スクロール処理 */
            history.pushState(null, null, '#' + val.target.id);
            const scrollProcessing = (event) => {
              d.body.classList.add('is_lock');
              event.preventDefault();
              //モバイルとデスクトップでスクロール値取得を分ける
              if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
                scrollPosition = event.changedTouches[0].pageY;
              } else {
                scrollPosition = w.pageYOffset || d.documentElement.scrollTop;
              }

              if (!scrollFlag) {
                scrollFlag = true;
                if (scrollPosition >= currentPosition) {// 下方向スクロール
                  if (slideNum >= slide.length - 1) {
                    slideNum = slide.length - 1; //スライド総数を超えないように代入
                  } else {
                    slideNum++;
                    slideWrapper.style.top = -windowHeight * slideNum + 'px';
                  }
                } else { //上方向スクロール
                  if (slideNum <= 0) { //スライドを0より小さくさせない
                    slideNum = 0;
                    scrollPosition = 0;
                    currentPosition = 0;
                  } else {
                    slideNum--;
                    slideWrapper.style.top = -windowHeight * slideNum + 'px';
                  }
                }
                setTimeout(() => { //スクロール禁止解除
                  scrollFlag = false;
                  d.body.classList.remove('is_lock');
                }, 2000);
              }
              currentPosition = scrollPosition; //比較値を上書き
            }

            //モバイルとデスクトップでイベント分岐
            if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
              w.addEventListener('touchmove', (event) => {
                scrollProcessing(event);
              }, { passive: false });
            } else {
              w.addEventListener('scroll', (event) => {
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
      querySliceAll(".js_slide").forEach((val) => {
        scrollObserver.observe(val);
      });
    

      /** スライドインでアニメーションクラス追加 */
      const slideFadeIn = (ele) => {
        d.getElementById(ele.id).classList.add('is_view');
        querySliceAll('#' + ele.id + ' .js_slideIn').forEach((val) => {
          val.classList.add('is_active');
        });
      };

      /** スライドアウトでアニメーションクラス削除 */
      const slideFadeOut = (ele) => {
        d.getElementById(ele.id).classList.remove('is_view');
        querySliceAll('#' + ele.id + ' .js_slideIn').forEach((val) => {
          val.classList.remove('is_active');
        });
      };
        
      /** カレントナビ */
      const currentNav = (ele) => {
        //現在見えているセクションidに合わせてナビをアクティブにする
        const currentActive = d.querySelector(".js_dots .is_active");
        if (currentActive !== null) {
          currentActive.classList.remove("is_active");
        }
        d.querySelector(`a[href='#${ele.id}']`).parentNode.classList.add("is_active");

        //ハッシュ先に移動
        querySliceAll('.js_dot').forEach((val, index) => {
          val.addEventListener('click', (event) => {
            event.preventDefault();
            slideWrapper.style.top = '-' + windowHeight * index + 'px';
            slideNum = index;
            scrollPosition = '-' + windowHeight * index + 'px';
            currentPosition = scrollPosition;
          });
        });
      };

      /** カレントナビとフェードイン実行 */
      const slideInEvent = (entries) => {
        [].slice.call(entries).forEach((val) => {
          if (val.isIntersecting) {
            currentNav(val.target);
            slideFadeIn(val.target);
          } else {
            slideFadeOut(val.target);
          }
        });
      };
      const slideInOptions = {
        root: null,
        rootMargin: "-50% 0px"
      };
      const slideInObserver = new IntersectionObserver(slideInEvent, slideInOptions);
      querySliceAll(".js_slide").forEach((val) => {
        slideInObserver.observe(val);
      });
    })();
  })(document, window);
}