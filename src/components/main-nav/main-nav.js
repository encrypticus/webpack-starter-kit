import MetisMenu from 'metismenujs';
// import OnOffCanvas from 'onoffcanvas';
import 'metismenujs/scss/metismenujs.scss';
// import 'onoffcanvas/scss/onoffcanvas.scss';
import 'mmenu-js';

const mmenu = new Mmenu('.main-nav_mobile', {
  extensions: ['position-right', 'theme-dark'],
});
const mmenuApi = mmenu.API;

const mainNav = new MetisMenu('.main-nav_full .main-nav__list_level-1');
// const mainNavMob = new MetisMenu('.main-nav_mobile .main-nav__list_level-1');
// const mobMenuCanvas = document.querySelector('#mob-menu-canvas');

const hamburger = document.querySelector('.hamburger');

// const mainNavMobCanvas = new OnOffCanvas(mobMenuCanvas);
// mainNavMobCanvas.on('show.onoffcanvas', () => {
//   hamburger.classList.add('is-active');
// });
//
// mainNavMobCanvas.on('hide.onoffcanvas', () => {
//   hamburger.classList.remove('is-active');
// });

hamburger.addEventListener('click', () => {
  // mobMenuCanvas.classList.add('onoffcanvas_opacity');
  mmenuApi.open();
}, false);

mmenuApi.bind('close:before', () => {
  hamburger.classList.remove('is-active');
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 767) {
    // mainNavMobCanvas.hide();
    mmenuApi.close();
  }
});
