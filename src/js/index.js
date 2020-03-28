require('intersection-observer');
import objectFitImages from 'object-fit-images';
objectFitImages();
import topPage from './top';
topPage();
import aboutPage from './about';
aboutPage();
import hamburgerMenu from './hamburgerMenu';
hamburgerMenu();

// 読み込み時の共通イベント
((d, w) => {
  w.addEventListener('load', () => {
    const targetElement = d.getElementById('js_top') || d.getElementById('js_about');
    targetElement.classList.add('is_loaded');
    if (targetElement.classList.contains('is_loaded')) {
      d.body.classList.remove('is_lock');
    }
  });
})(document, window);


import Barba from './barba.min';
Barba.Dispatcher.on( 'newPageReady', function( currentStatus, oldStatus, container, newPageRawHTML ) {
  if ( Barba.HistoryManager.history.length === 1 ) {
      return;
  }
  const head = document.head,
      newPageRawHead = newPageRawHTML.match( /<head[^>]*>([\s\S.]*)<\/head>/i )[ 0 ],
      newPageHead = document.createElement( 'head' );
  newPageHead.innerHTML = newPageRawHead;
  const headTags = [ 
      "meta[name='description']",
      "meta[property^='og']"
  ].join( ',' );
  const oldHeadTags = head.querySelectorAll( headTags );
  for ( let i = 0; i < oldHeadTags.length; i++ ) {
      head.removeChild( oldHeadTags[ i ] );
  }
  let newHeadTags = newPageHead.querySelectorAll( headTags );
  for ( let i = 0; i < newHeadTags.length; i++ ) {
      head.appendChild( newHeadTags[ i ] );
  }

  switch (currentStatus.namespace) {
    case 'top':
      topPage();
      console.log('index.html');
      break;
    case 'about':
      aboutPage();
      console.log('about.html');
      break;
  }
});
// Barba.Pjax.init();