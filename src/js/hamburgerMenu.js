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


    // ヘッダーのインスタグラムアイコン表示
    const isTop = () => {
      if (d.querySelector('main').classList.contains('ly_main')) {
        d.getElementById('js_header').classList.add('is_top');
      } else {
        d.getElementById('js_header').classList.remove('is_top');
      }
    };
    d.addEventListener('DOMContentLoaded', () => {
      isTop();
    })
    d.addEventListener('click', () => {
      isTop();
    });
  })(document,window);
};