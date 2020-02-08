import barba from '@barba/core';
import barbaCss from '@barba/css';
import top from './scrollEvent';

document.addEventListener('DOMContentLoaded', function () {
  barba.use(barbaCss);
  barba.init({
    transitions: [{
      leave({ current, next, trigger }) {
        // do something with `current.container` for your leave transition
        // then return a promise or use `this.async()`
      },
      enter({ current, next, trigger }) {
        // do something with `next.container` for your enter transition
        // then return a promise or use `this.async()`
      }
    }]
  });

  top();
});