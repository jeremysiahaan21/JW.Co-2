import routes from '../routes/routes';
import UrlParser from '../routes/url-parser';
import DrawerInitiator from '../utils/drawer-initiator';

class App {
  constructor({
    hamburgerButton,
    drawer,
    drawerNavBar,
    drawerListElement,
    content,
  }) {
    this._hamburgerButton = hamburgerButton;
    this._drawer = drawer;
    this._drawerNavBar = drawerNavBar;
    this._drawerListElement = drawerListElement;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._hamburgerButton,
      drawer: this._drawer,
      drawerNavBar: this._drawerNavBar,
      drawerListElement: this._drawerListElement,
      content: this._content,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];

    if (page === undefined) {
      window.location.href = '/';
      return;
    }
    this._content.innerHTML = await page;
  }
}

export default App;
