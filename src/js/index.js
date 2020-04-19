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
      fullScreenScroll();
      backgroundMouseMove();
    },
    aboutPage: () => {
      setTimeout(() => {
        scrollTo(0, 0);
      });
      d.body.style.height = '';
      d.body.style.overflow = 'scroll';
      [].slice.call(d.querySelectorAll('.js_active')).forEach((val) => {
        val.classList.add('is_active');
      });
      d.getElementById('js_header').classList.add('is_instagram');
      w.addEventListener('scroll', headerTextColor);
      w.addEventListener('scroll', progressBar);

    }
  }

  // idで存在判定 => pageEvents()
  const checkElementId = () => {
    if (d.getElementById('js_top')) {
      pageEvents.topPage();
    } else if (d.getElementById('js_about')) {
      pageEvents.aboutPage();
    }
    pageEvents.allPage();
  }

  // 初回用
  const init = () => {
    checkElementId();
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
    checkElementId();
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
  // URLに#有りでも有効 参考:https://www.willstyle.co.jp/blog/1722/
  Barba.Pjax.originalPreventCheck = Barba.Pjax.preventCheck;
  Barba.Pjax.preventCheck = function (evt, element) {
    if (element) {
      const url = location.protocol + '//' + location.host + location.pathname;
      const extract_hash = element.href.replace(/#.*$/,"");
      if (element.href.startsWith(location.protocol + '//' + location.host)) {
        if (element.href.indexOf('#') > -1 &&  extract_hash != url ){
          return true;
        }
      }
    }
    return true;
  }
})(document, window);