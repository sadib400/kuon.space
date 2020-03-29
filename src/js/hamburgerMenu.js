export default function () {
  ((d, w) => {
    const querySliceAll = (ele) => {
      return [].slice.call(d.querySelectorAll(ele));
    }
    //ハンバーガーメニュー
    d.getElementById('js_hamburgerMenu').addEventListener('click', () => {
      d.getElementById('js_hamburgerMenu').classList.toggle('is_close');
      d.querySelector('.js_menuOpen').classList.toggle('is_open');
      d.body.classList.toggle('is_lock');
      querySliceAll('.js_link').forEach((val) => {
        setTimeout(() => {
          val.classList.toggle('is_open');
        },400);
      });
    });
    querySliceAll('.js_link').forEach((val) => { //メニュー項目をクリックした時の処理
      val.addEventListener('click', () => {
        d.getElementById('js_hamburgerMenu').classList.toggle('is_close');
        d.querySelector('.js_menuOpen').classList.toggle('is_open');
        d.body.classList.toggle('is_lock');
        querySliceAll('.js_link').forEach((val) => {
          val.classList.remove('is_open');
        });
      });
    });

    // ヘッダーのインスタグラムアイコン表示
    const InstagramIcon = (() => {
      if (d.getElementById('js_about')) {
        d.getElementById('js_header').classList.add('is_instagram');
      } else {
        d.getElementById('js_header').classList.remove('is_instagram');
      }
    })();
  })(document,window);
};