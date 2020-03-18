export default function () {
  if (document.getElementById('js_top')) {
    ((d, w) => {
        
      const queryAll = (ele) => {
        return [].slice.call(d.querySelectorAll(ele));
      }

      //マウス座標を基に背景移動(月と雲)
      const backgroundPosition = () => {
        document.body.addEventListener('mousemove', (e) => {
          let bgX = e.pageX * .02;
          let bgY = e.pageY * .04;
          let textX = e.pageX * .01;
          let textY = e.pageY * .01;
          let moonX = e.pageX * .02;
          let moonY = e.pageY * .04;
          let cloudX = e.pageX * .03;
          let cloudY = e.pageY * .03;
          let deepCloudX = e.pageX * .03;
          let deepCloudY = e.pageY * .05;
    
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

      // is_showの付いているスライドにアニメーションクラス追加
      const slideAnime = () => {
        setTimeout(() => {
          const isShow = d.querySelector('.is_show');
          const isAnime = [].slice.call(isShow.querySelectorAll('.js_slideIn'));
          const windowH = w.innerHeight;
          const posY = isShow.getBoundingClientRect().top;
          const clientHeight = isShow.getBoundingClientRect().height;
        
          if (posY + clientHeight > 0 && posY < windowH) {
            isAnime.forEach((val) => {
              val.classList.add('is_active');
            });
          } else {
            isAnime.forEach((val) => {
              val.classList.remove('is_active');
            });
          }

          w.addEventListener('scroll', () => {
            isAnime.forEach((val) => {
              val.classList.remove('is_active');
            });
          })
        }, 1000);
      };


      // 実行
      w.addEventListener('load', () => {
        d.getElementById('js_top').classList.add('is_loaded');

        setTimeout(() => {
          d.getElementById('top').classList.add('is_show');
        }, 600);

        backgroundPosition();
        slideAnime();

        w.addEventListener('resize', () => {
          slideTop = []; // offsetTopを入れ直す
          queryAll('.js_slide').forEach((val) => {
            const rectTop = val.getBoundingClientRect().top;
            const offSetTop = rectTop + w.pageYOffset || d.documentElement.scrollTop;;
            slideTop.push(offSetTop);
          });
        });
      });






      //スクロール関連の要素
      const slideWrapper = d.getElementById('js_content');
      const slide = document.querySelectorAll('.js_slide');
      let slideTop = [];

      queryAll('.js_slide').forEach((val) => {
        const offSetTop = val.getBoundingClientRect().top + w.pageYOffset || d.documentElement.scrollTop;
        slideTop.push(offSetTop);
      });

      let slideNum = 0 //スライド番号
      let scrollFlag = false; //スクロールフラグ
      let currentPosition = 0; //現在位置
      let scrollPosition = 0; //スクロール量

      w.addEventListener('scroll', () => {
        d.body.style.overflow = 'hidden'; //擬似的にスクロール制限
        scrollPosition = w.pageYOffset || d.documentElement.scrollTop;
        
        if (!scrollFlag) {
          scrollFlag = true;
          
          if (currentPosition <= scrollPosition) {// 下方向スクロール
            if (slideNum >= slide.length - 1) {
              slideNum = slide.length - 1; //スライド総数を超えないように代入
              scrollPosition = slideTop[slideNum];
            } else {
              slideNum++;
              slideWrapper.style.top = -slideTop[slideNum] + 'px'; //css:topにoffsetTopを代入
            }
          } else { //上方向スクロール
            if (slideNum <= 0) { //スライド一枚目より小さくさせない
              slideNum = 0;
              currentPosition = 0;
              scrollPosition = 0;
            } else {
              slideNum--;
              slideWrapper.style.top = -slideTop[slideNum] + 'px';
            }
          }

          setTimeout(() => {
            scrollFlag = false;
            d.body.style.overflow = '';
          }, 2000);
        }
        currentPosition = scrollPosition; //比較値を現在のoffsetTopに上書き
      });



      // Intersection Observerでのカレントナビ監視
      const currentNav = (ele) => { //現在見えているセクションに合わせてナビをアクティブにする
        const currentActive = d.querySelector(".js_dots .is_active");
        if (currentActive !== null) {
          currentActive.classList.remove("is_active");
        }
        d.querySelector(`a[href='#${ele.id}']`).parentNode.classList.add("is_active");
      }

      const intersectionItem = (entries) => {
        [].slice.call(entries).forEach(val => {
          if (val.isIntersecting) {
            currentNav(val.target);
          }
        });
      }

      const options = {
        root: null,
        rootMargin: "0px 0px -100% 0px"
      };
      const observer = new IntersectionObserver(intersectionItem, options);
      queryAll(".js_slide").forEach(section => {
        observer.observe(section);
      });

      
    })(document, window);
  }
}