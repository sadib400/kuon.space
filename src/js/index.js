import topPage from './top';
import aboutPage from './about';
import hamburgerMenu from './hamburgerMenu';
hamburgerMenu();

require('intersection-observer');

import objectFitImages from 'object-fit-images';
objectFitImages();

import Barba from './barba.min';
Barba.Dispatcher.on('newPageReady', (currentStatus) => {
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
Barba.Pjax.init();