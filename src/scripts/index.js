import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import '../styles/responsive.css';
import './views/templates/catalogue-element';
import './views/templates/catalogue-favorite-element';
import './views/templates/catalogue-item-element';
import './views/templates/catalogue-item-detail-element';
import './views/pages/home';
import './views/pages/detail';
import './views/pages/favorite';

import App from './views/app';
import swRegister from './utils/sw-register';
import DataCatalogueSource from './data/catalogue-data-source';

const app = new App({
  hamburgerButton: document.querySelector('#hamburger'),
  drawer: document.getElementById('drawer'),
  drawerNavBar: document.querySelector('.nav__list'),
  drawerListElement: document.querySelectorAll('.nav__item a'),
  content: document.getElementById('content__item'),
});

const skipContentAnchor = document.getElementById('skip-link');

window.addEventListener('load', async () => {
  DataCatalogueSource.getCatalogueData();
  app.renderPage();

  skipContentAnchor.addEventListener('click', () => {
    app.focusContent();
  });
  await swRegister();
});
window.addEventListener('hashchange', () => {
  app.renderPage();
});
