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
Barba.Pjax.start();

// ページ毎の処理
const pageType = {
  all: () => {
    hamburgerMenu();
    d.querySelector('.js_instagram').classList[top ? 'add' : 'remove']('is_hide');
  },
  top: () => {
    d.body.style.overflow = '';
    fullScreenScroll();
    backgroundMouseMove();
    setTimeout(() => { header.classList.remove('is_intersection'); });
  },
  about: () => {
    d.body.style.height = '';
    d.body.style.overflow = 'scroll';
    querySliceCall(d.querySelectorAll('.js_active')).forEach((val) => {
      val.classList.add('is_active');
    });
    headerTextColor();
    w.addEventListener('scroll', progressBar);
    setTimeout(() => { scrollTo(0, 0); });
  }
}

const pageTop = Barba.BaseView.extend({
  namespace: 'top',
  onEnterCompleted: function() {
    pageType.top();
  }
});

const pageAbout = Barba.BaseView.extend({
  namespace: 'about',
  onEnterCompleted: function() {
    pageType.about();
  }
});

const checkPage = () => {
  pageTop.init();
  pageAbout.init();
}

// 初回表示用
const init = () => {
  if (top) {
    pageType.top();
  } else if (about) {
    pageType.about();
  }
  pageType.all();
  d.body.classList.add('is_init');
}
w.addEventListener('load', init);

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

// pjax対象のリンクをクリックした時。
Barba.Dispatcher.on('linkClicked', function () {
  checkPage();
});