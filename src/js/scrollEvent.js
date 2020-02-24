export default function () {
  function sliceAll(ele) {
    return [].slice.call(document.querySelectorAll(ele));
  }



  ((d,w) => {
    //スクロール関連の要素
    const mainContainer = d.getElementById('js_main');
    const slideContent = d.getElementById('js_content');
    const slide = sliceAll('.js_slide');
  
    //フルスクリーンスクロール
    let slideNum = 0; //スライド番号用
    let flag = false; //スライドのフラグ用
    let defaultPos = w.pageYOffset; //最初のスクロール値 比較用

    console.log(defaultPos,slide.length);
    
    w.addEventListener('scroll', (e) => {
      e.preventDefault();
      let scrollPos = w.pageYOffset;

      console.log("scroll");


      if (!flag) {
        if (defaultPos < scrollPos) { //下方向
          console.log("DOWN")

          if (slideNum >= slide.length - 1) {
            slideNum = slide.length - 1; //スライド総数を超えないように代入
          } else {
            slideNum++;
          }

        } else { //上方向
          console.log("UP")

          if (slideNum <= 0) { //スライド一番目より小さくさせない
            slideNum = 0;
          } else {
            slideNum--;
          }
        }
      
        if (slideNum === 1) {
          slideContent.style.top = '-100vh';
        } else if (slideNum === 2) {
          slideContent.style.top = '-200vh';
        } else if (slideNum === 3) {
          slideContent.style.top = '-300vh';
        } else {
          slideContent.style.top = '0';
        }

        flag = true;
      }
      console.log(defaultPos, scrollPos);
      
      defaultPos = scrollPos; //比較用の値を上書き

      setTimeout(() => {
        flag = false;
      }, 1000);
    });
  })(document,window);
};