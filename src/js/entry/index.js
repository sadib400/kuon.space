import {d, w, top, about, header, hamburgerButton, querySliceCall} from '../common/util';
require('intersection-observer');
import objectFitImages from 'object-fit-images';
objectFitImages();
import hamburgerMenu from '../common/hamburgerMenu';
import backgroundMouseMove from '../top/backgroundMouseMove';
import fullScreenScroll from '../top/fullScreenScroll';
import headerTextColor from '../about/headerTextColor';
import progressBar from '../about/progressBar';
import Barba from "barba.js";

// ページごとの処理
const pageEvents = {
  all: () => {
    hamburgerMenu();
    about ? header.classList.add('is_instagram') : header.classList.remove('is_instagram');
  },
  top: () => {
    d.body.style.overflow = '';
    fullScreenScroll();
    backgroundMouseMove();
  },
  about: () => {
    setTimeout(() => {
      scrollTo(0, 0);
    });
    d.body.style.height = '';
    d.body.style.overflow = 'scroll';
    querySliceCall(d.querySelectorAll('.js_active')).forEach((val) => {
      val.classList.add('is_active');
    });
    hamburgerButton.addEventListener('click', headerTextColor);
    headerTextColor();
    w.addEventListener('scroll', progressBar);
  }
}

const checkPage = () => {
  if (top) {
    pageEvents.top();
  } else if (about) {
    pageEvents.about();
  }
  pageEvents.all();
}

// 初回用
const init = () => {
  checkPage();
  d.body.classList.add('is_init');
}
w.addEventListener('load', init);



// barba.js  参考：https://qiita.com/kokushin/items/a9cca2ef52e6e927115d
Barba.Pjax.start();

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
  checkPage();
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