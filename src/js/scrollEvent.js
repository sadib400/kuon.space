export default function () {

  ((d,w) => {
    //スクロール関連の要素
    const slideWrapper = d.getElementById('js_content');
    const slide = document.querySelectorAll('.js_slide');
    let slideNum = 0; //スライド番号用
    let flag = false; //スライドのフラグ用
    let defaultPos = w.pageYOffset; //最初のスクロール値

    let slideTop = [];
    const slideAry = [].slice.call(slide);

    slideAry.forEach((val) => {
      const rect = val.getBoundingClientRect();
      const rectTop = rect.top;
      const offSetTop = rectTop + w.pageYOffset;
      slideTop.push(offSetTop);
    });

    console.log(slideTop);
  
    w.addEventListener('scroll', (e) => {
      e.preventDefault();
      let scrollPos = w.pageYOffset || d.documentElement.scrollTop;
      


      if (!flag) {

        flag = true;
        
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
          slideWrapper.style.top = -slideTop[slideNum] + 'px';
          d.body.style.overflow = 'hidden';
        } else if (slideNum === 2) {
          slideWrapper.style.top = -slideTop[slideNum] + 'px';
          d.body.style.overflow = 'hidden';
        } else if (slideNum === 3) {
          slideWrapper.style.top = -slideTop[slideNum] + 'px';
          d.body.style.overflow = 'hidden';
        } else {
          slideWrapper.style.top = '0';
          d.body.style.overflow = 'hidden';
        }

        if (slideNum === slide.length - 1) {
          if (defaultPos < scrollPos) { //下方向
            console.log("LAST SLIDE")
            
          }
        }
      }
      
      defaultPos = scrollPos; //比較用の値を上書き

      console.log("スクロール量:",defaultPos,"スライドNo: ",slideNum);

      if (flag) {
        setTimeout(() => {
          flag = false;
          d.body.style.overflow = '';
        }, 2000);
      }
    });
  })(document,window);
};