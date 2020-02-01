export default function test() {
  const scrollSection = [].slice.call(document.querySelectorAll('.js-scroll'));

  window.addEventListener('wheel', function (e) {
    e.preventDefault();
    scrollSection.forEach(function (ele) {
      ele.classList.add('add-active');
    });
  });
}