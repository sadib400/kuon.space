export default function () {
  ((d) => {
    // ヘッダー&矢印ボタン
    const headerTextColor = (() => {
      const contents = d.getElementById('js_about');
      const keyVisual = d.getElementById('about');
      if (contents) {
        const scrollTop = d.documentElement.scrollTop || d.body.scrollTop;
        const posY = contents.getBoundingClientRect().top;
        const offSetTop = scrollTop + posY;
        const keyVisualHeight = keyVisual.getBoundingClientRect().height;

        // KVエリアを基準に文字色変更
        if (scrollTop > offSetTop + keyVisualHeight) {
          d.getElementById('js_header').classList.add('is_color');
          d.getElementById('js_arrowButton').classList.add('is_color');
          d.getElementById('js_scrollDown').style.opacity = 0;
        } else {
          d.getElementById('js_header').classList.remove('is_color');
          d.getElementById('js_arrowButton').classList.remove('is_color');
          d.getElementById('js_scrollDown').style.opacity = '';
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
    })();
  })(document);
};