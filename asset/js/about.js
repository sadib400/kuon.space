!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([,function(e,t,n){"use strict";n.r(t),t.default=function(){!function(e,t){if(e.getElementById("js_about")){var n=function(){var t;(t=".js_progressBar",[].slice.call(e.querySelectorAll(t))).forEach((function(e){var t=window.innerHeight,n=e.getBoundingClientRect().top;n+e.getBoundingClientRect().height>0&&n<t&&e.classList.add("is_active")}))},o=function(){var t=e.getElementById("js_about"),n=e.getElementById("about"),o=document.documentElement.scrollTop||document.body.scrollTop,r=t.getBoundingClientRect().top,s=o+r,l=n.getBoundingClientRect().height;o>s+l?(e.getElementById("js_header").classList.add("is_color"),e.getElementById("js_arrowButton").classList.add("is_color"),e.getElementById("js-scrollDown").style.opacity=0):(e.getElementById("js_header").classList.remove("is_color"),e.getElementById("js_arrowButton").classList.remove("is_color"),e.getElementById("js-scrollDown").style.opacity=""),e.getElementById("js_hamburgerMenu").addEventListener("click",(function(){e.getElementById("js_hamburgerMenu").classList.contains("is_close")?e.getElementById("js_header").classList.remove("is_color"):o>s+l?e.getElementById("js_header").classList.add("is_color"):e.getElementById("js_header").classList.remove("is_color")}))};t.addEventListener("load",(function(){e.getElementById("js_keyVisualSize").classList.add("is_sizeUp"),o(),t.addEventListener("scroll",(function(){o(),n()}))}))}}(document,window)}}]);