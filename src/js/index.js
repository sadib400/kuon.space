import hamburgerMenu from './hamburgerMenu';
import scrollEvent from './scrollEvent';
hamburgerMenu();
setTimeout(() => {
  scrollEvent();
}, 1000);


((d,w) => {
  const sliceAll = (ele) => {
    return [].slice.call(d.querySelectorAll(ele));
  }

  w.addEventListener('load', () => {
    d.getElementById('js_main').classList.add('is_loaded');
    setTimeout(() => {
      d.getElementById('top').classList.add('is_show');
    }, 600);

    // トップページ ページャー&アニメーション
    const dot = sliceAll('.js_dot');
    const active = d.getElementsByClassName('is_active');
    const show = d.getElementsByClassName('is_show');
    const slideIn = sliceAll('.js_slideIn');
    
    dot.forEach((val) => {
      val.addEventListener('click',(e) => {
        active[0].classList.remove('is_active'); //ナビアクティブクラス付け替え
        e.currentTarget.classList.add('is_active');

        const pagerIndex = dot.indexOf(val); //ページャーに合わせてスライドにaddClass
        show[0].classList.remove('is_show');
        setTimeout(() => {
          slide[pagerIndex].classList.add('is_show');
        }, 1000);
      });
    });

    // is_showの付いているスライドにアニメーションクラス追加
    const slideAnime = () => {
      setTimeout(() => {
        const isShow = d.querySelector('.is_show');
        const isAnime = [].slice.call(isShow.querySelectorAll('.js_slideIn'));
        
        const windowH = w.innerHeight;
        const posY = isShow.getBoundingClientRect().y;
        const clientHeight = isShow.getBoundingClientRect().height;

        console.log(clientHeight)
        
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
    slideAnime();

    
    const targetNav = sliceAll('.js_dot');
    const targetEle = d.getElementById('js_content');
    const slide = sliceAll('.js_slide');
    let slideTop = [];

    slide.forEach((val) => {
      const rect = val.getBoundingClientRect();
      const rectTop = rect.top;
      const offSetTop = rectTop + w.pageYOffset;
      slideTop.push(offSetTop);
    });

    targetNav.forEach((val, index) => {
      val.addEventListener('click', () => {
        if (index === 1) {
          targetEle.style.top = -slideTop[index] + 'px';
        } else if (index === 2) {
          targetEle.style.top = -slideTop[index] + 'px';
        } else if (index === 3) {
          targetEle.style.top = -slideTop[index] + 'px';
        } else {
          targetEle.style.top = '0';
        }
      });
    });


    w.addEventListener('resize', () => { //再び要素トップに配置
      const slide = sliceAll('.js_slide');
      slideTop = [];
      slide.forEach((val) => {
        const rect = val.getBoundingClientRect();
        const rectTop = rect.top;
        const offSetTop = rectTop + w.pageYOffset;
        slideTop.push(offSetTop);

        console.log(slideTop);
      });
    });
  });
})(document, window);