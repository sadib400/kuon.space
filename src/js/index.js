require('intersection-observer');
import objectFitImages from 'object-fit-images';
import Barba from "barba.js";

import hamburgerMenu from './hamburgerMenu';
import backgroundMouseMove from './backgroundMouseMove';
import fullScreenScroll from './fullScreenScroll';
import headerTextColor from './headerTextColor';
import progressBar from './progressBar';


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

// 共通
window.addEventListener('DOMContentLoaded', objectFitImages);
window.addEventListener('DOMContentLoaded', hamburgerMenu);
window.addEventListener('load', blackCurtain);

// index.html用
if (document.getElementById('js_top')) {
  window.addEventListener('load', fullScreenScroll);
  window.addEventListener('load', backgroundMouseMove);
}
// about.html用
if (document.getElementById('js_about')) {
  window.addEventListener('load', keyVisualScale);
  window.addEventListener('scroll', headerTextColor);
  window.addEventListener('scroll', progressBar);
}


Barba.Dispatcher.on('newPageReady', function (currentStatus, oldStatus, container, newPageRawHTML) {
  if (Barba.HistoryManager.history.length === 1) {
    return;
  }
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

  switch (currentStatus.namespace) {
    case 'top':
      //イベント削除
      window.removeEventListener('load', blackCurtain);
      window.removeEventListener('load', keyVisualScale);
      window.removeEventListener('scroll', headerTextColor);
      window.removeEventListener('scroll', progressBar);
      //イベント登録
      window.addEventListener('load', blackCurtain);
      window.addEventListener('load', backgroundMouseMove);
      window.addEventListener('load', fullScreenScroll);
      break;
    case 'about':
      //イベント削除
      window.removeEventListener('load', blackCurtain);
      window.removeEventListener('load', backgroundMouseMove);
      window.removeEventListener('load', fullScreenScroll);
      //イベント登録
      window.addEventListener('load', blackCurtain);
      window.addEventListener('load', keyVisualScale);
      window.addEventListener('scroll', headerTextColor);
      window.addEventListener('scroll', progressBar);
      break;
  }
});
// Barba.Pjax.start();