import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();
import scrollEvent from './scrollEvent';

window.addEventListener('load', () => {
  document.getElementById('js_main').classList.add('is_loaded');
});

function sliceAll(ele) {
  return [].slice.call(document.querySelectorAll(ele));
}

// ハンバーガーメニュー
((d) => {
  d.getElementById('js_hamburgerMenu').addEventListener('click', () => { //ハンバーガーボタンをクリックした時の処理
    d.getElementById('js_hamburgerMenu').classList.toggle('is_close');
    d.querySelector('.js_menuOpen').classList.toggle('is_open');
    d.body.classList.toggle('is_lock');
    sliceAll('.js_link').forEach((val) => {
      setTimeout(() => {
        val.classList.toggle('is_open');
      },400);
    });
  });
  sliceAll('.js_link').forEach((val,i,ary) => { //項目をクリックした時の処理
    val.addEventListener('click', () => {
      d.getElementById('js_hamburgerMenu').classList.toggle('is_close');
      d.querySelector('.js_menuOpen').classList.toggle('is_open');
      d.body.classList.toggle('is_lock');
      sliceAll('.js_link').forEach((val) => {
        val.classList.remove('is_open');
      });
    });
  });
})(document);

// カレントナビ
((d,w) => {

  //固定配置のページネーション
  const dot = d.querySelectorAll('.js_dot');
  const active = d.getElementsByClassName('is_active');
  
  //アクティブクラス付け替え
  for (let i = 0; i < dot.length; i++) {
    dot[i].addEventListener('click', (e) => {
      active[0].classList.remove('is_active');
      e.currentTarget.classList.add('is_active');
    });
  }

  
  const targetNav = sliceAll('.js_dot');
  const targetEle = d.querySelector('.js_targetElements');
  const slide = sliceAll('.js_slide');
  let slideTop = [];

  slide.forEach(val => {
    const rect = val.getBoundingClientRect();
    const rectTop = rect.top;
    const offSetTop = rectTop + w.pageYOffset;
    slideTop.push(offSetTop);
  });

  targetNav.forEach((val,index) => {
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
    const slideTop = [];
    slide.forEach(val => {
      const rect = val.getBoundingClientRect();
      const rectTop = rect.top;
      const offSetTop = rectTop + w.pageYOffset;
      slideTop.push(offSetTop);
    });
    w.scroll({
      top: slideTop,
      behavior: 'smooth'
    });
  });
})(document,window);

// フルスクリーンスクロール関連
scrollEvent();