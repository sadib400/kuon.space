require('intersection-observer');
import objectFitImages from 'object-fit-images';
import hamburgerMenu from './hamburgerMenu';
import backgroundMouseMove from './backgroundMouseMove';
import fullScreenScroll from './fullScreenScroll';
import headerTextColor from './headerTextColor';
import progressBar from './progressBar';
import Barba from "barba.js";


//ロード後の黒幕
const blackCurtain = () => {
  const targetElement = document.getElementById('js_top') || document.getElementById('js_about');
  targetElement.classList.add('is_loaded');
  if (targetElement.classList.contains('is_loaded')) document.body.classList.remove('is_lock');
};
//ヒーローイメージ拡大 => about.html
const keyVisualScale = () => {
  const keyVisual = document.getElementById('js_keyVisualSize');
  if (keyVisual) keyVisual.classList.add('is_sizeUp');
};
// 実行
objectFitImages();
window.addEventListener('DOMContentLoaded', hamburgerMenu);
window.addEventListener('load', blackCurtain);



// barba.js 参考：https://qiita.com/kokushin/items/a9cca2ef52e6e927115d
Barba.Dispatcher.on('newPageReady', function (currentStatus, oldStatus, container, newPageRawHTML) {
  if (Barba.HistoryManager.history.length === 1) {
    return;
  }
  // headタグ差し替え
  const head = document.head,
    newPageRawHead = newPageRawHTML.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0],
    newPageHead = document.createElement('head');
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

//index.htmlに遷移する時
const top = Barba.BaseView.extend({
  namespace: 'top',
  onEnter: function () {
    window.addEventListener('load', fullScreenScroll, false);
    window.addEventListener('load', backgroundMouseMove, false);
  },
  onEnterCompleted: () => {
    blackCurtain();
    backgroundMouseMove();
    fullScreenScroll();
  },
  onLeave: function () {
  },
  onLeaveCompleted: function() {
    window.removeEventListener('load', fullScreenScroll, false);
    window.removeEventListener('load', backgroundMouseMove, false);
  }
});
top.init();

//about.htmlに遷移する時
const about = Barba.BaseView.extend({
  namespace: 'about',
  onEnter: function() {
    window.addEventListener('load', keyVisualScale, false);
    window.addEventListener('scroll', headerTextColor, false);
    window.addEventListener('scroll', progressBar, false);
  },
  onEnterCompleted: () => {
    document.body.style.height = '';
    blackCurtain();
    keyVisualScale();
    headerTextColor();
    progressBar();
  },
  onLeave: function() {
  },
  onLeaveCompleted: function() {
    window.removeEventListener('load', keyVisualScale, false);
    window.removeEventListener('scroll', headerTextColor, false);
    window.removeEventListener('scroll', progressBar, false);
  }
});
about.init();

Barba.Pjax.start();