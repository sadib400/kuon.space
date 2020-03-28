export default function () {

  ((d, w) => {
    if (d.getElementById('js_top')) {
        
      const queryAll = (ele) => {
        return [].slice.call(d.querySelectorAll(ele));
      }

      /** マウス座標を基に背景移動 */
      const backgroundMove = () => {
        document.body.addEventListener('mousemove', (ele) => {
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
    
          queryAll('.js_backgroundPosition').forEach((val) => {
            val.style.transform = 'translate' + '(' + '-' + bgX + 'px' + ',' + '-' + bgY + 'px' + ')';
          });
          queryAll('.js_background_text').forEach((val) => {
            val.style.transform = 'translate' + '(' + '-' + textX + 'px' + ',' + '-' + textY + 'px' + ')';
          });
          queryAll('.js_moon').forEach((val) => {
            val.style.transform = 'translate' + '(' + '-' + moonX + 'px' + ',' + '-' + moonY + 'px' + ')';
          });
          queryAll('.js_cloud').forEach((val) => {
            val.style.transform = 'translate' + '(' + '-' + cloudX + 'px' + ',' + '-' + cloudY + 'px' + ')';
          });
          queryAll('.js_deep_cloud').forEach((val) => {
            val.style.transform = 'translate' + '(' + '-' + deepCloudX + 'px' + ',' + '-' + deepCloudY + 'px' + ')';
          });
        });
      }

      
      /** フルスクリーンスクロール */
      const fullScreenScroll = () => {
        let slideNum = 0; //スライド番号
        let scrollFlag = false; //スライドのスクロールフラグ
        let currentPosition = 0; //スライドの現在位置
        let scrollPosition = 0; //スライドのスクロール量
        let windowHeight = w.innerHeight;
        const slideWrapper = d.getElementById('js_content'); //各スライドを囲む要素
        const slide = document.querySelectorAll('.js_slide'); //スライド要素

        //スライドの高さと位置を設定
        queryAll('.js_slide').forEach((val,index) => {
          let windowHeight = w.innerHeight;
          val.style.height = windowHeight + `px`;
          val.style.top = windowHeight * index + `px`;
          let allHeight = windowHeight * index + windowHeight;
          d.body.style.height = allHeight + `px`;
          slideWrapper.style.height = allHeight + `px`;
          slideWrapper.style.top = -windowHeight * slideNum + 'px';
        });
        w.addEventListener('resize', () => {
          windowHeight = w.innerHeight;
          queryAll('.js_slide').forEach((val,index) => {
            val.style.height = windowHeight + `px`;
            val.style.top = windowHeight * index + `px`;
            let allHeight = windowHeight * index + windowHeight;
            d.body.style.height = allHeight + `px`;
            slideWrapper.style.height = allHeight + `px`;
            slideWrapper.style.top = -windowHeight * slideNum + 'px';
          });
        });

        /** フルスクリーンスクロール実行 */
        const scrollEvent = (entries) => {
          [].slice.call(entries).forEach((val, index) => {
            if (val.isIntersecting) {
              //URLハッシュのみ更新
              history.pushState(null, null, '#' + val.target.id);
              // location.hash = val.target.id;
              
              /** スクロール処理 */
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
        queryAll(".js_slide").forEach((val) => {
          scrollObserver.observe(val);
        });
      

        /** スライドイン */
        const slideFadeIn = (ele) => {
          const currentSlide = d.getElementById("js_content").querySelector('.is_show');
          if (currentSlide !== null) {
            currentSlide.classList.remove("is_show");
          }
          d.getElementById(ele.id).classList.add("is_show");
          
          const isShow = d.querySelector('.is_show');
          [].slice.call(isShow.querySelectorAll('.js_slideIn')).forEach((val) => {
            val.classList.add('is_active');
          });
        };

        /** スライドアウト */
        const slideFadeOut = (ele) => {
          const currentSlide = d.getElementById("js_content").querySelector('.is_show');
          if (currentSlide !== null) {
            currentSlide.classList.remove("is_show");
          }
          d.getElementById(ele.id).classList.add("is_show");

          const isShow = d.querySelector('.is_show');
          [].slice.call(isShow.querySelectorAll('.js_slideIn')).forEach((val) => {
            val.classList.remove('is_active');
          });
        };
          
        /** カレントナビ */
        const currentNav = (ele) => {
          const currentActive = d.querySelector(".js_dots .is_active");
          if (currentActive !== null) {
            currentActive.classList.remove("is_active");
          }

          //現在見えているセクションに合わせてナビをアクティブにする
          d.querySelector(`a[href='#${ele.id}']`).parentNode.classList.add("is_active");

          //ハッシュ先に移動
          queryAll('.js_dot').forEach((val,index) => {
            val.addEventListener('click', (event) => {
              event.preventDefault();
              let targetHash = event.target.hash;
              let target = d.querySelector(targetHash).style.top;
              d.getElementById('js_content').style.top = '-' + target;
              slideNum = index;
              if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
                scrollPosition = event.changedTouches[0].pageY;
              } else {
                scrollPosition = w.pageYOffset || d.documentElement.scrollTop;
              }
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
        queryAll(".js_slide").forEach((val) => {
          slideInObserver.observe(val);
        });
      }


      // 実行
      w.addEventListener('load', () => {
        backgroundMove();
        fullScreenScroll();
      });
    }
  })(document, window);
}