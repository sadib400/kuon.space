export default function () {
  function sliceAll(ele) {
    return [].slice.call(document.querySelectorAll(ele));
  }
  ((d, w) => {
    w.addEventListener('load', () => {
      d.getElementById('js_hamburgerMenu').addEventListener('click', () => {
        d.getElementById('js_hamburgerMenu').classList.toggle('is_close');
        d.querySelector('.js_menuOpen').classList.toggle('is_open');
        d.body.classList.toggle('is_lock');
        sliceAll('.js_link').forEach((val) => {
          setTimeout(() => {
            val.classList.toggle('is_open');
          },400);
        });
      });
      sliceAll('.js_link').forEach((val) => { //メニュー項目をクリックした時の処理
        val.addEventListener('click', () => {
          d.getElementById('js_hamburgerMenu').classList.toggle('is_close');
          d.querySelector('.js_menuOpen').classList.toggle('is_open');
          d.body.classList.toggle('is_lock');
          sliceAll('.js_link').forEach((val) => {
            val.classList.remove('is_open');
          });
        });
      });
    });
  })(document,window);
};