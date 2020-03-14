import hamburgerMenu from './hamburgerMenu';
hamburgerMenu();

((d, w) => {
  const sliceAll = (ele) => {
    return [].slice.call(d.querySelectorAll(ele));
  }

  //プログレスバーのアニメーション用
  const progress = () => {
    sliceAll('.js_progressBar').forEach((val) => {
      const windowH = window.innerHeight;
      const posY = val.getBoundingClientRect().y;
      const clientHeight = val.getBoundingClientRect().height;
      if (posY + clientHeight > 0 && posY < windowH) {
        val.classList.add('is_active');
      }
    });
  }

  // ヘッダー&矢印ボタンのカラー
  const headerTextColor = () => {
    const contents = d.getElementById('js_about');
    const keyVisual = d.getElementById('about');
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const posY = contents.getBoundingClientRect().top;
    const offSetTop = scrollTop + posY;
    const keyVisualHeight = keyVisual.getBoundingClientRect().height;
    
    // KVエリアを基準に文字色変更
    if (scrollTop > offSetTop + keyVisualHeight) {
      d.getElementById('js_header').classList.add('is_color');
      d.getElementById('js_arrowButton').classList.add('is_color');
    } else {
      d.getElementById('js_header').classList.remove('is_color');
      d.getElementById('js_arrowButton').classList.remove('is_color');
    }
    // ハンバーガーメニュー開閉時の文字色変更
    d.getElementById('js_hamburgerMenu').addEventListener('click', () => {
      if (d.getElementById('js_hamburgerMenu').classList.contains('is_close')) {
        d.getElementById('js_header').classList.remove('is_color');
      } else {
        if (scrollTop > offSetTop + keyVisualHeight) {
          d.getElementById('js_header').classList.add('is_color');
        } else {
          d.getElementById('js_header').classList.remove('is_color');
        }
      }
    });
  }

  // スクロールダウン矢印の表示切り替え
  const scrollDowmArrow = () => {

  }

  // 実行
  w.addEventListener('load', () => {
    d.getElementById('js_about').classList.add('is_loaded');
    headerTextColor();

    w.addEventListener('scroll', () => {
      headerTextColor();
      progress();
    });
  });
})(document, window);