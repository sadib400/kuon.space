import {d, w, useId, setClass, sliceCall} from '../common/util';
require('intersection-observer');
import objectFitImages from 'object-fit-images';
objectFitImages();
import anime from 'animejs';
import hamburgerMenu from '../common/hamburgerMenu';
import backgroundMouseMove from '../top/backgroundMouseMove';
import activeClass from '../top/activeClass';
import fullScreenScroll from '../top/fullScreenScroll';
import headerTextColor from '../about/headerTextColor';
import progressBar from '../about/progressBar';
import Barba from "barba.js";


// barba.js 対象クリック要素
let linkTarget;
Barba.Dispatcher.on('linkClicked', function(element) {
  linkTarget = element;
});


// barba.js 遷移アニメーション
const normalTransition = Barba.BaseTransition.extend({
  start: function() {
    this.newContainerLoading.then(this.finish.bind(this));
  },
  finish: function() {
    document.body.scrollTop = 0;
    this.done();
  }
});

const backArrowTransition = Barba.BaseTransition.extend({
  start: function() {
    this.move().then(this.removeClasses).then(this.newContainerLoading).then(this.finish.bind(this))
  },
  move: function() {
    return new Promise(function (resolve) {
      anime.remove("html, body");
      anime({
        targets: "html, body",
        scrollTop: 0,
        dulation: 600,
        easing: 'easeOutCubic',
        complete: function () {
          resolve();
        }
      });
    })
  },
  removeClasses: function () {
    return new Promise(function (resolve) {
      setClass(d.querySelectorAll('#js_hero .js_active'), 'remove', 'is_active');
      setClass(d.querySelectorAll('#about .js_fromAnother'), 'add', 'is_active');
      setClass(d.querySelector('#about .js_btn'), 'add', 'is_position');
      // transition分を待ってからdone()へ
      setTimeout(() => {
        resolve();
      }, 1600);
    });
  },
  finish: function () {
    this.done();
  }
});

Barba.Pjax.getTransition = function () {
  let transition;
  if (linkTarget == d.getElementById('js_arrowButton')) {
    transition = backArrowTransition;
  } else {
    transition = normalTransition;
  }
  return transition;
};


/** ページ毎の処理
 * @property {object} all 共通部分
 * @property {object} top index.html
 * @property {object} about about.html
 */
const pageType = {
  all: () => {
    hamburgerMenu();
    d.querySelector('.js_instagram').classList[useId.top ? 'add' : 'remove']('is_hide');
  },
  top: () => {
    activeClass();
    fullScreenScroll();
    backgroundMouseMove();
    setTimeout(() => { useId.header.classList.remove('is_intersection'); },100);
  },
  about: () => {
    sliceCall(d.querySelectorAll('.js_active')).forEach((val) => {
      val.classList.add('is_active');
    });
    headerTextColor();
    w.addEventListener('scroll', progressBar);
    setTimeout(() => { scrollTo(0, 0); });
  }
}


// barba.js 遷移分岐用
const pageTop = Barba.BaseView.extend({
  namespace: 'top',
  onEnterCompleted: () => {
    pageType.top();
  }
});
const pageAbout = Barba.BaseView.extend({
  namespace: 'about',
  onEnterCompleted: () => {
    pageType.about();
  }
});
pageTop.init();
pageAbout.init();


// ページの初回表示用
const init = () => {
  Barba.Pjax.start();
  if(window.navigator.userAgent.toLowerCase().indexOf('trident') === -1) Barba.Prefetch.init();
  pageType.all();
  d.body.classList.add('is_curtain');
  setTimeout(() => {
    d.body.classList.add('is_init');
  },600);
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
  if (!element) return;
  if (element) {
    const url = location.protocol + '//' + location.host + location.pathname;
    const extract_hash = element.href.replace(/#.*$/,"");
    if (element.href.startsWith(location.protocol + '//' + location.host)) {
      if (element.href.indexOf('#') > -1 &&  extract_hash != url ){
        return true;
      }
    }
    if (element.classList.contains('js_noBarba')) {
      return false;
    }
  }
  return true;
}