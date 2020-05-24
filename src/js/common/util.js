const util = {
  w: window,
  d: document,
  useId: {
    top: document.getElementById('js_top'),
    about: document.getElementById('js_about'),
    header: document.getElementById('js_header'),
    hamburgerButton: document.getElementById('js_hamburgerMenu')
  },
  useRegex: {
    topPath: RegExp('/$'),
    aboutPath: RegExp('/about.html$')
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

  /** setClasses (classの付け替え)
   * @param {String} element 対象セレクタ
   * @param {String} classList classList: 'add' or 'remove' or 'toggle'
   * @param {String} className class名 初期値： 'is_intersection'
   */
  setClasses: (element, classList = 'add', className = 'is_intersection') => {
    const condition = (element) => {
      switch (classList) {
        case 'add':
          element.classList.add(className);
          break;
        case 'remove':
          element.classList.remove(className);
          break;
        case 'toggle':
          element.classList.toggle(className);
          break;
        default:
          break;
      }
    };
    if ({}.toString.call(element) === '[object NodeList]' || {}.toString.call(element) === '[object Array]') {
      [].slice.call(element).forEach((element) => {
        condition(element);
      });
    } else {
      condition(element);
    }
  },

  /** inViewClasses (可視範囲のクラス付与)
   * @param {String} observeTarget 交差対象セレクタ (IntersectionObserverの発火要素)
   * @param {String} classTarget class付替対象のセレクタ (常に画面内にあるfixed要素対策)
   * @param {String} visibleClassList 可視範囲のclassList ('add' or 'remove')
   * @param {String} inVisibleClassList 不可視範囲のclassList ('add' or 'remove')
   */
  inViewClasses: (observeTarget, classTarget = observeTarget, visibleClassList = 'add', inVisibleClassList = null, root = null, rootMargin = '0px') => {
    const setClass = (entries) => {
      if ({}.toString.call(entries) === '[object Array]') {
        [].slice.call(entries).forEach((entry) => {
          if (entry.isIntersecting) {
            classTarget !== observeTarget ? setClasses(classTarget, visibleClassList) : setClasses(entry.target, visibleClassList);
          } else {
            classTarget !== observeTarget ? setClasses(classTarget, inVisibleClassList) : setClasses(entry.target, inVisibleClassList);
          }
        })
      } else {
        entries.isIntersecting ? setClasses(classTarget, visibleClassList) : setClasses(classTarget, inVisibleClassList);
      }
    };
    const options = {
      root: root,
      rootMargin: rootMargin
    };

    const init = new IntersectionObserver(setClass, options);
    if ({}.toString.call(observeTarget) === '[object NodeList]' || {}.toString.call(observeTarget) === '[object Array]') {
      [].slice.call(observeTarget).forEach((observeTarget) => {
        init.observe(observeTarget);
      })
    } else {
      init.observe(observeTarget);
    }
  }
}

const d = util.d;
const w = util.w;
const useId = util.useId;
const useRegex = util.useRegex;
const isMobile = util.isMobile;
const userAgentFunction = util.userAgentFunction;
const sliceCall = util.sliceCall;
const setClasses = util.setClasses;
const inViewClasses = util.inViewClasses;

export {
  d as d,
  w as w,
  useId as useId,
  useRegex as useRegex,
  isMobile as isMobile,
  userAgentFunction as userAgentFunction,
  sliceCall as sliceCall,
  setClasses as setClasses,
  inViewClasses as inViewClasses,
};