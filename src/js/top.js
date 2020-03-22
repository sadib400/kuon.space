export default function () {
  ((d, w) => {
    if (d.getElementById('js_top')) {
        
      const queryAll = (ele) => {
        return [].slice.call(d.querySelectorAll(ele));
      }

      /** マウス座標を基に背景移動 */
      const backgroundPosition = () => {
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
        let slideNum = 0 //スライド番号
        let scrollFlag = false; //スクロールフラグ
        let currentPosition = 0; //現在位置
        let scrollPosition = 0; //スクロール量
        let windowHeight = w.innerHeight;
        const slideWrapper = d.getElementById('js_content');
        const slide = document.querySelectorAll('.js_slide');

        /** スクロール処理 */
        const scrollProcessing = (event) => {
          d.body.classList.add('is_lock'); //スクロール制限
          event.preventDefault();
          if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) { //モバイルとデスクトップでスクロール値取得を分ける
            scrollPosition = event.changedTouches[0].pageY;
          } else {
            scrollPosition = w.pageYOffset || d.documentElement.scrollTop;
          }
          
          if (!scrollFlag) {
            scrollFlag = true;

            if (currentPosition <= scrollPosition) {// 下方向スクロール
              if (slideNum >= slide.length - 1) {
                slideNum = slide.length - 1; //スライド総数を超えないように代入
              } else {
                slideNum++;
                slideWrapper.style.transform = 'translateY(' + -windowHeight * slideNum + 'px)';
              }
            } else { //上方向スクロール
              if (slideNum <= 0) { //スライドを0より小さくさせない
                slideNum = 0;
                currentPosition = 0;
                scrollPosition = 0;
              } else {
                slideNum--;
                slideWrapper.style.transform = 'translateY(' + -windowHeight * slideNum + 'px)';
              }
            }
            
            setTimeout(() => { //スクロール禁止解除
              scrollFlag = false;
              d.body.classList.remove('is_lock');
            }, 2000);
          }
          currentPosition = scrollPosition; //比較値を現在のoffsetTopに上書き
          
          w.addEventListener('resize', () => {
            windowHeight = w.innerHeight;
            slideWrapper.style.transform = 'translateY(' + -windowHeight * slideNum + 'px)';
          });
        }
  
        /** フルスクリーンスクロール実行 */
        const intersectionItem = (entries) => {
          [].slice.call(entries).forEach(val => {
            if (val.isIntersecting) {
              if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
                w.addEventListener('touchmove', (event) => {
                  scrollProcessing(event);
                }, { passive: false });
              } else {  
                w.addEventListener('scroll', (event) => {
                  scrollProcessing(event);
                }, { passive: false });
              }  
            }
          });
        }
        const options = {
          root: null,
          rootMargin: "0px 0px -100% 0px"
        };
        const observer = new IntersectionObserver(intersectionItem, options);
        queryAll(".js_slide").forEach(val => {
          observer.observe(val);
        });
      }


      /** 可視範囲のアクティブ処理 */
      const activeProcessing = () => {
        /** スライドアニメーション */
        const slideFadeIn = (ele) => {
          const currentSlide = d.querySelector("#js_content .is_show");
          if (currentSlide !== null) {
            currentSlide.classList.remove("is_show");
          }
          d.querySelector('#' + ele.id).classList.add("is_show");
          
          const isShow = d.querySelector('.is_show');
          const isAnime = [].slice.call(isShow.querySelectorAll('.js_slideIn'));
          isAnime.forEach((val) => {
            val.classList.add('is_active');
          });
        };
        const slideFadeOut = (ele) => {
          const currentSlide = d.querySelector("#js_content .is_show");
          if (currentSlide !== null) {
            currentSlide.classList.remove("is_show");
          }
          d.querySelector('#' + ele.id).classList.add("is_show");

          const isShow = d.querySelector('.is_show');
          const isAnime = [].slice.call(isShow.querySelectorAll('.js_slideIn'));
          isAnime.forEach((val) => {
            val.classList.remove('is_active');
          });
        };
          
        /** カレントナビ */
        const currentNav = (ele) => {
          const currentActive = d.querySelector(".js_dots .is_active");
          if (currentActive !== null) {
            currentActive.classList.remove("is_active");
          }
          d.querySelector(`a[href='#${ele.id}']`).parentNode.classList.add("is_active");//現在見えているセクションに合わせてナビをアクティブにする
        };

        /** カレントナビとフェードイン実行 */
        const intersectionItem = (entries) => {
          [].slice.call(entries).forEach(val => {
            if (val.isIntersecting) {
              currentNav(val.target);
              slideFadeIn(val.target);
            } else {
              slideFadeOut(val.target);
            }
          });
        };
        const options = {
          root: null,
          rootMargin: "-50% 0px"
        };
        const observer = new IntersectionObserver(intersectionItem, options);
        queryAll(".js_slide").forEach(section => {
          observer.observe(section);
        });
      }


      // 実行
      w.addEventListener('load', () => {
        d.getElementById('js_top').classList.add('is_loaded');
        setTimeout(() => {
          d.body.classList.remove('is_lock'); // 黒い幕が終わったタイミング
        }, 600);
        backgroundPosition();
        fullScreenScroll();
        activeProcessing();
      });
    }
  })(document, window);
}