const util = {
  w : window,
  d: document,
  top: document.getElementById('js_top'),
  about: document.getElementById('js_about'),
  header: document.getElementById('js_header'),
  hamburgerButton : document.getElementById('js_hamburgerMenu'),
  isMobile: navigator.userAgent.match(/iPhone|Android.+Mobile/),
  querySliceCall : (element) => {
    return [].slice.call(element);
  },

  /** setClass (classの付け替え)
   * @param element{String} 対象セレクタ
   * @param type{String} 'add' or 'remove' or 'toggle'
   * @param className{String} class名
   */
  setClass: (element, type = 'add', className = 'is_intersection') => {
    const condition = (entry) => {
      switch (type) {
        case 'add':
          entry.classList.add(className);
          break;
        case 'remove':
          entry.classList.remove(className);
          break;
        case 'toggle':
          entry.classList.toggle(className);
          break;
        default:
          break;
      }
    };
    if ({}.toString.call(element) === '[object NodeList]' || {}.toString.call(element) === '[object Array]') {
      [].slice.call(element).forEach((entry) => {
        condition(entry);
      });
    } else {
      condition(element);
    }
  },

  /** checkElementType (NodeList or HTMLCollection 判定)
   * @param targetElement{String} 対象セレクタ
   * @param nodeListFunc{Object} nodeListの処理
   * @param htmlCollectionFunc{Object} HTMLCollectionの処理
   */
  checkElementType : (targetElement, nodeListFunc, htmlCollectionFunc) => {
    if ({}.toString.call(element) === '[object NodeList]' || {}.toString.call(element) === '[object Array]') {
      nodeListFunc(targetElement);
    } else {
      htmlCollectionFunc(targetElement);
    }
  },

  /** fadeToggleClass (可視範囲のクラス付与)
   * @param observeTarget{String} 交差対象セレクタ (IntersectionObserverの発火要素)
   * @param element{String} class付替対象のセレクタ (常に画面内にいるようなposition:fixed要素のclass操作などに)
   * @param visibleClassType{String} 可視のclassList ('add' or 'remove')
   * @param inVisibleClassType{String} 不可視のclassList ('add' or 'remove')
   */
  fadeToggleClass: (observeTarget, element = observeTarget, visibleClassType = 'add', inVisibleClassType = 'remove', root = null, rootMargin = '0px') => {
    // class付与のコールバック
    const callback = (entries) => {
      if ({}.toString.call(entries) === '[object Array]') {
        [].slice.call(entries).forEach((entry) => {
          if (entry.isIntersecting) {
            setClass(element, visibleClassType);
          } else {
            setClass(element, inVisibleClassType);
          }
        })
      } else {
        if (entries.isIntersecting) {
          console.log(entries);
          setClass(element, visibleClassType);
        } else {
          setClass(element, inVisibleClassType);
        }
      }
    };
    // オプション
    let options = {
      root: root,
      rootMargin: rootMargin
    };
    // 初期化
    const init = new IntersectionObserver(callback, options);
    const observerNode = (observeTarget) => {
      [].slice.call(observeTarget).forEach((val) => {
        init.observe(val);
      })
    }
    const observerHtml = (observeTarget) => {
      init.observe(observeTarget);
    }
    checkElementType(observeTarget, observerNode, observerHtml);
  }
}

const d = util.d;
const w = util.w;
const top = util.top;
const about = util.about;
const header = util.header;
const hamburgerButton = util.hamburgerButton;
const isMobile = util.isMobile;
const querySliceCall = util.querySliceCall;
const setClass = util.setClass;
const checkElementType = util.checkElementType;
const fadeToggleClass = util.fadeToggleClass;

export {
  d as d,
  w as w,
  top as top,
  about as about,
  header as header,
  hamburgerButton as hamburgerButton,
  isMobile as isMobile,
  querySliceCall as querySliceCall,
  setClass as setClass,
  checkElementType as checkElementType,
  fadeToggleClass as fadeToggleClass,
};