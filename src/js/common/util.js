const util = {
  w: window,
  d: document,
  useId: {
    top: document.getElementById('js_top'),
    about: document.getElementById('js_about'),
    header: document.getElementById('js_header'),
    hamburgerButton: document.getElementById('js_hamburgerMenu')
  },
  isMobile: navigator.userAgent.match(/iPhone|iPad|Android.+Mobile/),
  userAgentFunction: {
    isIE11: (callback) => {
      if(window.navigator.userAgent.toLowerCase().indexOf('trident') !== -1) {
        callback();
      }
    },
    isSafari: (callback) => {
      if(window.navigator.userAgent.toLowerCase().indexOf('safari') !== -1 && window.navigator.userAgent.toLowerCase().indexOf('chrome') === -1 && window.navigator.userAgent.toLowerCase().indexOf('edge') === -1) {
        callback();
      }
    }
  },
  sliceCall : (element) => {
    return [].slice.call(element);
  },

  /** setClass (classの付け替え)
   * @param {String} element 対象セレクタ
   * @param {String} classList classList: 'add' or 'remove' or 'toggle'
   * @param {String} className class名 初期値： 'is_intersection'
   */
  setClass: (element, classList = 'add', className = 'is_intersection') => {
    const condition = (entry) => {
      switch (classList) {
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
   * @param {String} targetElement 対象セレクタ
   * @param {Object} nodeListFunc nodeListの処理
   * @param {Object} htmlCollectionFunc HTMLCollectionの処理
   */
  checkElementType: (targetElement, nodeListFunc, htmlCollectionFunc) => {
    if ({}.toString.call(targetElement) === '[object NodeList]' || {}.toString.call(targetElement) === '[object Array]') {
      nodeListFunc(targetElement);
    } else {
      htmlCollectionFunc(targetElement);
    }
  },

  /** fadeClass (可視範囲のクラス付与)
   * @param {String} observeTarget 交差対象セレクタ (IntersectionObserverの発火要素)
   * @param {String} classTarget class付替対象のセレクタ (常に画面内にいるようなposition:fixed要素のclass操作などに)
   * @param {String} visibleClassList 可視のclassList ('add' or 'remove')
   * @param {String} inVisibleClassList 不可視のclassList ('add' or 'remove')
   */
  fadeClass: (observeTarget, classTarget = observeTarget, visibleClassList = 'add', inVisibleClassList = 'remove', root = null, rootMargin = '0px') => {
    // class付与のコールバック
    const callback = (entries) => {
      if ({}.toString.call(entries) === '[object Array]') {
        [].slice.call(entries).forEach((entry) => {
          if (entry.isIntersecting) {
            classTarget !== observeTarget ? setClass(classTarget, visibleClassList) : setClass(entry.target, visibleClassList);
          } else {
            classTarget !== observeTarget ? setClass(classTarget, inVisibleClassList) : setClass(entry.target, inVisibleClassList);
          }
        })
      } else {
        entries.isIntersecting ? setClass(classTarget, visibleClassList) : setClass(classTarget, inVisibleClassList);
      }
    };
    let options = {
      root: root,
      rootMargin: rootMargin
    };
    // 実行
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
const useId = util.useId;
const isMobile = util.isMobile;
const userAgentFunction = util.userAgentFunction;
const sliceCall = util.sliceCall;
const setClass = util.setClass;
const checkElementType = util.checkElementType;
const fadeClass = util.fadeClass;

export {
  d as d,
  w as w,
  useId as useId,
  isMobile as isMobile,
  userAgentFunction as userAgentFunction,
  sliceCall as sliceCall,
  setClass as setClass,
  checkElementType as checkElementType,
  fadeClass as fadeClass,
};