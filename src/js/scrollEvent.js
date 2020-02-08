export default function() {

  (function () {
    //コンテンツの大枠
    const mainContainer = document.getElementById('container');
  
    //スクロール関連の要素
    const section = document.querySelectorAll('.js-section');
    const sectionAry = [].slice.call(section);
  
    //要素のrect.topを取得
    sectionAry.forEach(function (ele) {
      const screenRect = ele.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const offSetTop = screenRect.top + scrollTop;
      
      console.log(offSetTop);
    });
  
    window.addEventListener('wheel', function (e) {
      e.preventDefault();
      sectionAry.forEach(function (ele) {
        ele.classList.add('add-scroll');
      });
    });
  }());

  (function () {
    //固定配置のページネーション
    const dot = document.querySelectorAll('.js-dot');
    const active = document.getElementsByClassName('add-active');
    const dotLength = dot.length;
    
    //アクティブクラス付け替え
    for (let i = 0; i < dotLength; i++) {
      dot[i].addEventListener('click', function (e) {
        // e.preventDefault();
        active[0].classList.remove('add-active');
        this.classList.add('add-active');
      });
    }
  }());
};