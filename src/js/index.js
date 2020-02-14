import top from './scrollEvent';

document.addEventListener('DOMContentLoaded', function () {

  // top();

  //ハンバーガーメニュー
  document.getElementById('js_hamburgerMenu').addEventListener('click', function () {
    this.classList.toggle('is_close');
    document.querySelector('.js_menuOpen').classList.toggle('is_open');
    document.body.classList.toggle('is_lock');
    document.querySelectorAll('.js_link').forEach(function (ele) {
      setTimeout(function () {
        ele.classList.toggle('is_open');
      },400);
    });
  });
  
});