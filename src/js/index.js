require('intersection-observer');
import objectFitImages from 'object-fit-images';
objectFitImages();
import hamburgerMenu from './hamburgerMenu';
import backgroundMouseMove from './backgroundMouseMove';
import fullScreenScroll from './fullScreenScroll';
import headerTextColor from './headerTextColor';
import progressBar from './progressBar';
import Barba from "barba.js";

((d, w) => {
  // ページごとの処理
  const pageEvents = {
    allPage: () => {
      hamburgerMenu();
      if (d.body.classList.contains('is_init')) {
        d.querySelector('.js_curtain').classList.add('is_loaded');
        d.body.classList.remove('is_lock');
      }
    },
    topPage: () => {
      d.body.style.overflow = '';
      fullScreenScroll(); //スクリーンスクロール
      backgroundMouseMove(); //背景画像座標
      [].slice.call(d.querySelectorAll('.js_btn')).forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
          const btnIndex = index;
          [].slice.call(d.querySelectorAll('.js_imageSizeUp')).forEach((image, index, array) => {
            array[btnIndex].classList.add('is_sizeUp');
          });
        })
      });
      if (d.getElementById('js_header').classList.contains('is_instagram') || d.getElementById('js_header').classList.contains('is_color')) {
        d.getElementById('js_header').classList.remove('is_instagram');
        d.getElementById('js_header').classList.remove('is_color');
        w.removeEventListener('scroll', headerTextColor);
        w.removeEventListener('scroll', progressBar);
      }
    },
    aboutPage: () => {
      d.body.style.height = '';
      d.body.style.overflow = 'scroll';
      [].slice.call(d.querySelectorAll('.js_active')).forEach((val) => {
        val.classList.add('is_active');
      });
      d.getElementById('js_arrowButton').classList.add('is_show');
      d.getElementById('js_header').classList.add('is_instagram');
      w.addEventListener('scroll', headerTextColor); //ヘッダーナビの文字色変更
      w.addEventListener('scroll', progressBar); //プログレスバーのゲージ
    }
  }

  // idで存在判定 > pageEvents()
  const checkId = () => {
    if (d.getElementById('js_top')) {
      pageEvents.topPage();
    } else if (d.getElementById('js_about')) {
      pageEvents.aboutPage();
    }
    pageEvents.allPage();
  }

  // 初回用
  const init = () => {
    checkId();
    d.querySelector('.js_curtain').classList.add('is_init');
    if (d.querySelector('.js_curtain').classList.contains('is_init')) {
      d.body.classList.remove('is_lock');
      d.body.classList.add('is_init');
    }
  }
  w.addEventListener('load', init);



  // barba.js  参考：https://qiita.com/kokushin/items/a9cca2ef52e6e927115d
  Barba.Pjax.start();

  // 遷移処理が完了し、以前の要素が削除されたとき
  Barba.Dispatcher.on('transitionCompleted', function(){
    checkId();
  });

  // 新しい要素が読み込まれ、コンテナ要素に挿入されたとき
  Barba.Dispatcher.on('newPageReady', function (currentStatus, oldStatus, container, newPageRawHTML) {
    if (Barba.HistoryManager.history.length === 1) {
      return;
    }
    // headタグ差し替え
    const head = d.head,
      newPageRawHead = newPageRawHTML.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0],
      newPageHead = d.createElement('head');
    newPageHead.innerHTML = newPageRawHead;
    const headTags = [
      "meta[name='description']",
      "meta[property^='og']"
    ].join(',');
    const oldHeadTags = head.querySelectorAll(headTags);
    for (let i = 0; i < oldHeadTags.length; i++) {
      head.removeChild(oldHeadTags[i]);
    }
    let newHeadTags = newPageHead.querySelectorAll(headTags);
    for (let i = 0; i < newHeadTags.length; i++) {
      head.appendChild(newHeadTags[i]);
    }
  });
})(document, window);